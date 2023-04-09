/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalContext from "@/contexts/modal-context/modal-context"
import { Form, InputNumber, message, Modal } from "antd"
import React, { useContext, useEffect } from "react"
import ReloadButton from "@/components/ReloadButton"
import getStockPrice from "@/api/get-stock-price"
import AssetContext from "@/contexts/asset-context/asset-context"
import UserContext from "@/contexts/user-context/user-context"
import { formatToCurrencyString } from "@/utils/number-utils"
import { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import buyAsset from "@/api/buy-asset"
import { useRouter } from "next/router"
import getUser from "@/api/get-user"
import { isMarketClosed } from "@/utils/stock-util"
import SpinningLoader from "@/components/SpinningLoader"
import getMarketState from "@/api/get-market-state"
import { GetAssetsResponse } from "@/utils/types"

const initialFormValues = {
  position: 0
}

interface Props {
  refetchAssets: () => Promise<
    QueryObserverResult<GetAssetsResponse[] | undefined>
  >
}

const BuyAssetModal = ({ refetchAssets }: Props) => {
  const { setModalId, open, setOpen } = useContext(ModalContext)
  const { user, setUser, token } = useContext(UserContext)
  const { asset, lastPrice, setLastPrice, marketState, setMarketState } =
    useContext(AssetContext)
  const [values, setValues] = React.useState(initialFormValues)
  const [amountInvested, setAmountInvested] = React.useState<number>(0)
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  // LAST PRICE
  const { refetch, isLoading, isError, error } = useQuery(
    ["lastPrice", user, token, [asset]],
    async () => {
      if (user == null || token == null || asset == null) return
      return await getStockPrice(user.id, token, [asset.symbol])
    },
    {
      onSuccess: (data) => {
        if (data === undefined) return
        setLastPrice(data[0].price)
      },
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  // USER
  const { refetch: refetchUser } = useQuery(
    ["user", id, token],
    () => {
      if (token === undefined) return
      return getUser(id, token)
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  )

  //MARKET STATE
  const { data: marketStateData, refetch: refetchMarketState } = useQuery(
    ["market-state", asset?.symbol],
    () => {
      if (asset == null || asset?.symbol === undefined || asset.symbol === "")
        return
      return getMarketState(asset.symbol)
    },
    {
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    refetchMarketState().then((res) => {
      if (res.data === undefined) return
      setMarketState(res.data.marketState)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAmountInvested(lastPrice * values.position)
  }, [lastPrice, values.position])

  useEffect(() => {
    if (marketStateData === undefined) return
    setMarketState(marketStateData?.marketState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketStateData])

  if (isLoading) return <SpinningLoader />
  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data?.message).then()
      return null
    }
    console.error(error)
    return null
  }

  async function handleSubmit(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    const data = {
      name: asset?.name as string,
      symbol: asset?.symbol as string,
      position: values.position,
      amountInvested: amountInvested
    }
    try {
      if (token === undefined) return
      await buyAsset(data, id, token)
      await refetchAssets()
      const returnedUser = refetchUser()
      if (returnedUser === undefined) return
      refetchUser().then((data) => {
        if (data.data !== undefined) {
          setUser(data.data)
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e instanceof AxiosError) {
        message.error(e?.response?.data.message)
      }
      console.error(e)
    }
    setOpen(false)
    setModalId("")
  }

  return (
    <Modal
      cancelButtonProps={{
        danger: true,
        onClick: () => {
          setOpen(false)
          setModalId("")
        }
      }}
      centered={true}
      keyboard={true}
      mask={true}
      maskClosable={true}
      okButtonProps={{
        disabled: isMarketClosed(marketState),
        onClick: handleSubmit
      }}
      open={open}
    >
      <Form
        initialValues={{
          lastPrice,
          amountInvested: lastPrice * values.position
        }}
      >
        <Form.Item label="Asset">
          {asset?.name} (${asset?.symbol})
        </Form.Item>

        <Form.Item label="Last market price">
          {formatToCurrencyString(lastPrice)}
        </Form.Item>

        <Form.Item label="Position" name="position">
          <InputNumber
            autoFocus
            defaultValue={0}
            keyboard
            onChange={(value) => setValues({ ...values, position: value ?? 0 })}
          />
        </Form.Item>

        <Form.Item label="Last price">
          <>
            {formatToCurrencyString(lastPrice)}{" "}
            <ReloadButton function={refetch} />{" "}
            {marketState === "REGULAR" || marketState === "OPEN" ? (
              <span style={{ color: "green" }}>NASDAQ-OPEN</span>
            ) : (
              <span style={{ color: "red" }}>NASDAQ-CLOSED</span>
            )}
          </>
        </Form.Item>

        <Form.Item label="Total cost of investment">
          <b>
            {(lastPrice * values.position).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </b>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BuyAssetModal
