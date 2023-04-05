import React, { useContext, useEffect, useState } from "react"
import { Form, message, Modal, Select, Spin, InputNumber } from "antd"
import {
  GetMarketStateResponse,
  ListedStock,
  NewStockInitialInputType
} from "@/utils/types"
import { QueryObserverResult, useQuery } from "react-query"
import getListedStocks from "@/api/get-listed-stocks"
import { AxiosError } from "axios"
import ModalContext from "@/contexts/modal-context/modal-context"
import { newStockInitialInput } from "@/utils/constants"
import UserContext from "@/contexts/user-context/user-context"
import { useRouter } from "next/router"
import getStockPrice from "@/api/get-stock-price"
import ReloadButton from "@/components/ReloadButton"
import buyAsset from "@/api/buy-asset"
import getUser from "@/api/get-user"
import AssetContext from "@/contexts/asset-context/asset-context"
import InsightsCard from "@/components/InsightsCard"
import { checkMarketOpen } from "@/utils/stock-util"

type SelectOptionType = {
  label: string
  value: string
}

type Props = {
  refetch: () => void
  refetchMarketState: () => Promise<
    QueryObserverResult<GetMarketStateResponse | undefined>
  >
}

const BuyNewStockModal: React.FC<Props> = ({ refetch, refetchMarketState }) => {
  const router = useRouter()
  const { userId } = router.query
  const id = userId

  const { token } = useContext(UserContext)
  const { marketState, setMarketState } = useContext(AssetContext)
  const { setModalId, open, setOpen } = useContext(ModalContext)
  const { setUser } = useContext(UserContext)

  const [listedStocks, setListedStocks] = useState<Array<ListedStock>>([])
  const [lastPrice, setLastPrice] = useState<number>(0)
  const [amountInvested, setAmountInvested] = useState<number>(3000)

  const [values, setValues] =
    useState<NewStockInitialInputType>(newStockInitialInput)
  const isMarketClosed = checkMarketOpen(marketState)

  // LISTED STOCKS
  const {
    data: listedStocksData,
    error,
    isLoading,
    isError
  } = useQuery(["listed-stocks"], () => getListedStocks(), {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (listedStocksData === undefined) {
      return
    }
    setListedStocks(listedStocksData)
  }, [listedStocksData])

  // USER
  const { refetch: refetchUser } = useQuery(
    ["user", id, token],
    () => {
      if (id === undefined || token === undefined) return
      return getUser(id, token)
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false
    }
  )

  // STOCK PRICE
  const {
    data: stockPriceData,
    isError: isStockPriceError,
    error: stockPriceError,
    refetch: refetchStockPrice
  } = useQuery(
    ["get-stock-price", values.symbol, token, id],
    () => {
      if (values.symbol === "" || token === undefined || id === undefined)
        return
      return getStockPrice(id, token, [values.symbol])
    },
    {
      retry: false,
      refetchOnWindowFocus: false
    }
  )

  const stockOptions: SelectOptionType[] = listedStocks?.map((listedStock) => {
    return {
      value: listedStock.symbol,
      label: listedStock.name
    }
  })

  useEffect(
    () => setAmountInvested(values.position * lastPrice),
    [lastPrice, values]
  )

  useEffect(() => {
    if (values.symbol === "" || values.symbol == null) return

    refetchMarketState().then((res) => {
      if (res?.data === undefined) return
      setMarketState(res?.data?.marketState)
    })

    refetchStockPrice().then((res) => {
      if (res?.data === undefined) return
      setLastPrice(res?.data[0]?.price ?? 0)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.symbol])

  useEffect(() => {
    if (stockPriceData === undefined) return
    setLastPrice(stockPriceData[0]?.price)
  }, [stockPriceData])

  async function handleSubmit(
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
    try {
      if (token === undefined || id === undefined) return
      await buyAsset({ ...values, amountInvested }, id, token)
      refetch()
      const returnedUser = refetchUser()
      if (!returnedUser) return
      refetchUser()
        .then((data) => {
          if (data.data) {
            setUser(data.data)
          }
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            message.error(e?.response?.data.message)
          }
          message.error("Error fetching the updated user information")
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

  function handleCancel() {
    setOpen(false)
  }

  if (isLoading) {
    return <Spin />
  }

  if (isError) {
    if (error instanceof AxiosError) {
      message
        .error(
          "Error getting NASDAQ stocks list: " + error?.response?.data.message
        )
        .then()
    }
    message.error(JSON.stringify(error)).then()
  }

  if (isStockPriceError) {
    if (stockPriceError instanceof AxiosError) {
      message.error(stockPriceError?.response?.data.message).then()
    }
  }

  return (
    <Modal
      centered={true}
      keyboard={true}
      mask={true}
      okButtonProps={{
        disabled: isMarketClosed,
        htmlType: "submit",
        onClick: handleSubmit
      }}
      okText="Confirm"
      open={open}
      onCancel={handleCancel}
      title={<h2>Get your first stock!</h2>}
    >
      <Form title="Buy new stock">
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
                name: (option as SelectOptionType)?.label
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

        <Form.Item label="Last price">
          <>
            {lastPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}{" "}
            <ReloadButton function={refetchStockPrice} />{" "}
            {checkMarketOpen(marketState) ? (
              <span style={{ color: "red" }}>NASDAQ-CLOSED</span>
            ) : (
              <span style={{ color: "green" }}>NASDAQ-OPEN</span>
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

      {Boolean(values.symbol) && Boolean(lastPrice) && (
        <InsightsCard symbol={values.symbol} lastPrice={lastPrice} />
      )}
    </Modal>
  )
}

export default BuyNewStockModal
