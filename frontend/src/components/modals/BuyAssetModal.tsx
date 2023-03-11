import ModalContext from "@/contexts/modal-context/modal-context"
import { Form, InputNumber, message, Modal, Spin } from "antd"
import React, { useContext } from "react"
import ReloadButton from "@/components/ReloadButton"
import getStockPrice from "@/api/get-stock-price"
import AssetContext from "@/contexts/asset-context/asset-context"
import UserContext from "@/contexts/user-context/user-context"
import { formatToCurrencyString } from "@/utils/number-utils"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

const initialFormValues = {
  symbol: "",
  name: "",
  position: 0,
  amountInvested: 0
}

const BuyAssetModal = () => {
  const { setModalId, open, setOpen } = useContext(ModalContext)
  const { token } = useContext(UserContext)
  const { asset, lastPrice, setLastPrice } = useContext(AssetContext)
  const [values, setValues] = React.useState(initialFormValues)
  const { user } = useContext(UserContext)

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

  if (isLoading) return <Spin />
  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data?.message).then()
      return null
    }
    message.error(JSON.stringify(error)).then()
    return null
  }

  async function handleAssetBuy(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
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
        onClick: handleAssetBuy
      }}
      open={open}
    >
      <Form>
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
