import React, { useCallback, useContext, useEffect, useState } from "react"
import { Form, message, Modal, Select, Spin, Input, InputNumber } from "antd"
import { ListedStock, NewStockInitialInputType } from "@/utils/types"
import { useQuery } from "react-query"
import getListedStocks from "@/api/get-listed-stocks"
import { AxiosError } from "axios"
import ModalContext from "@/contexts/modal-context/modal-context"
import { newStockInitialInput } from "@/utils/constants"
import UserContext from "@/contexts/user-context/user-context"
import { useRouter } from "next/router"
import getStockPrice from "@/api/get-stock-price"

type SelectOptionType = {
  label: string
  value: string
}

const BuyNewStockModal: React.FC = () => {
  const router = useRouter()
  const { userId } = router.query
  const id = userId as string
  const { token } = useContext(UserContext)
  const { error, isLoading, isError } = useQuery(
    ["listed-stocks"],
    getListedStocks,
    {
      onSuccess: (data) => {
        if (data) {
          setListedStocks(data.listedStocks)
        }
      }
    }
  )
  const [values, setValues] =
    useState<NewStockInitialInputType>(newStockInitialInput)

  const { setModalId, open, setOpen } = useContext(ModalContext)
  const [listedStocks, setListedStocks] = useState<Array<ListedStock>>([])

  const [lastPrice, setLastPrice] = useState<number>(0)
  const [amountInvested, setAmountInvested] = useState<number>(3000)

  const stockOptions: SelectOptionType[] = listedStocks.map((listedStock) => {
    return {
      value: listedStock.symbol,
      label: listedStock.name
    }
  })

  useEffect(
    () => setAmountInvested(values.position * lastPrice),
    [lastPrice, values]
  )

  async function handleSubmit(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    console.log({ ...values, amountInvested })
    setOpen(false)
    setModalId("")
  }

  function handleCancel() {
    setOpen(false)
  }

  if (isLoading) {
    return <Spin />
  }

  if (isError) {
    if (error instanceof AxiosError) {
      message.error(error?.response?.data.message).then()
    }
    message.error(JSON.stringify(error)).then()
  }

  return (
    <Modal
      centered={true}
      keyboard={true}
      mask={true}
      maskClosable={true}
      okButtonProps={{
        htmlType: "submit",
        onClick: handleSubmit
      }}
      okText="Confirm"
      open={open}
      onCancel={handleCancel}
    >
      <Form colon={false}>
        <Form.Item label="Symbol" name="symbol">
          <Select
            allowClear
            bordered
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
            }
            onChange={async (value: string, option) => {
              setValues({
                ...values,
                symbol: value,
                name: (option as SelectOptionType).label
              })
              getStockPrice(id, token, value).then((data) => {
                if (data) {
                  setLastPrice(Number(data[0].price) ?? 0)
                }
              })
            }}
            options={stockOptions}
            placeholder="Select a stock"
            showSearch
            style={{ width: 250 }}
          />
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
          ${lastPrice}
        </Form.Item>

        <Form.Item label="Total cost of investment" name="amountInvested">
          ${lastPrice * values.position}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BuyNewStockModal
