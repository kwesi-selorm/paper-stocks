import ModalContext from "@/contexts/modal-context/modal-context"
import { Form, InputNumber, message, Modal, Spin } from "antd"
import React, { useContext, useEffect } from "react"
import ReloadButton from "@/components/ReloadButton"
import getStockPrice from "@/api/get-stock-price"
import AssetContext from "@/contexts/asset-context/asset-context"
import UserContext from "@/contexts/user-context/user-context"
import { formatToCurrencyString } from "@/utils/number-utils"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import buyAsset from "@/api/buy-asset"
import { useRouter } from "next/router"
import getUser from "@/api/get-user"

const initialFormValues = {
  position: 0
}

interface Props {
  refetchAssets: () => void
}

const BuyAssetModal = ({ refetchAssets }: Props) => {
  const { setModalId, open, setOpen } = useContext(ModalContext)
  const { user, setUser, token } = useContext(UserContext)
  const { asset, lastPrice, setLastPrice } = useContext(AssetContext)
  const [values, setValues] = React.useState(initialFormValues)
  const [amountInvested, setAmountInvested] = React.useState<number>(0)
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  const { refetch, isLoading, isError, error } = useQuery(
    ["lastPrice", user, token, [asset]],
    async () => {
      if (!user || !token || !asset) return
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

  const { refetch: refetchUser } = useQuery(
    ["user", id, token],
    () => getUser(id, token),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false
    }
  )

  useEffect(() => {
    setAmountInvested(lastPrice * values.position)
  }, [lastPrice, values.position])

  if (isLoading) return <Spin />
  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data?.message).then()
      return null
    }
    message.error(JSON.stringify(error)).then()
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
      await buyAsset(data, id, token)
      await refetchAssets()
      const returnedUser = refetchUser()
      if (!returnedUser) return
      refetchUser().then((data) => {
        if (data.data) {
          setUser(data.data)
        }
      })
    } catch (e: any) {
      if (e instanceof AxiosError) {
        message.error(e?.response?.data.message)
      }
      message.error(JSON.stringify(e.message))
    }
    setOpen(false)
    setModalId("")
  }

  return (
    <Modal
      cancelButtonProps={{
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

        <Form.Item label="Last price" name="lastPrice">
          <>
            {formatToCurrencyString(lastPrice)}{" "}
            <ReloadButton function={refetch} />
          </>
        </Form.Item>

        <Form.Item label="Total cost of investment" name="amountInvested">
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
