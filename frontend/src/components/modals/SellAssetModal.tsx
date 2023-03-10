import React, { useContext } from "react"
import { useRouter } from "next/router"
import { Form, InputNumber, message, Modal, Spin } from "antd"
import ModalContext from "@/contexts/modal-context/modal-context"
import UserContext from "@/contexts/user-context/user-context"
import AssetContext from "@/contexts/asset-context/asset-context"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import getStockPrice from "@/api/get-stock-price"
import getUser from "@/api/get-user"
import sellAsset from "@/api/sell-asset"
import { formatToCurrencyString } from "@/utils/number-utils"
import ReloadButton from "@/components/ReloadButton"

interface Props {
  refetchAssets: () => void
}

const SellAssetModal = ({ refetchAssets }: Props) => {
  const { setModalId, open, setOpen } = useContext(ModalContext)
  const { user, setUser, token } = useContext(UserContext)
  const { asset, lastPrice, setLastPrice } = useContext(AssetContext)
  const [values, setValues] = React.useState({ position: 0 })
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string

  const { refetch, isLoading, isError, error } = useQuery(
    ["lastPrice", user, token, asset],
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

  async function handleSubmit(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    if (!asset) return

    try {
      const data = {
        symbol: asset.symbol,
        positionsSold: values.position,
        unitPrice: lastPrice
      }
      await sellAsset(data, id, token)
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
    await refetchAssets()
    setOpen(false)
    setModalId("")
  }

  if (isLoading) return <Spin />
  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data?.message).then()
      return null
    }
    message.error(JSON.stringify(error)).then()
    return null
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
      <Form initialValues={{ lastPrice }}>
        <Form.Item label="Asset">
          {asset?.name} (${asset?.symbol})
        </Form.Item>

        <Form.Item label="Position" name="position">
          <InputNumber
            autoFocus
            defaultValue={0}
            keyboard
            onChange={(value) => setValues({ position: value ?? 0 })}
          />
        </Form.Item>

        <Form.Item label="Last price" name="lastPrice">
          <>
            {formatToCurrencyString(lastPrice)}{" "}
            <ReloadButton function={refetch} />
          </>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SellAssetModal
