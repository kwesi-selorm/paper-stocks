import { Pie } from "@ant-design/plots"
import React from "react"
import { AssetPlotData, GetAssetsResponse } from "@/utils/types"
import { formatToCurrencyString } from "@/utils/number-utils"
import { Datum } from "@antv/g2plot"
import styles from "../../styles/components/AssetsGraph.module.css"
import { Legend } from "@antv/component"

type Props = {
  assets: GetAssetsResponse[]
}

const AssetsGraph: React.FC<Props> = ({ assets }) => {
  const data: AssetPlotData[] = assets.map((a) => ({
    ...a,
    value: formatToCurrencyString(a.averagePrice * a.position)
  }))

  const config = {
    data,
    colorField: "name",
    angleField: "position",
    radius: 1,
    innerRadius: 0.4,
    label: {
      type: "inner",
      offset: "-50%",
      content: (datum: Datum) => {
        return datum.name
        // return datum.name + " [" + datum.position + "]"
      },
      style: {
        fill: "#fff",
        fontSize: 12,
        textAlign: "center"
      }
    },
    legend: Legend,
    interactions: [
      {
        type: "element-selected"
      },
      {
        type: "element-active"
      }
    ],
    tooltip: {
      fields: ["position"],
      formatter: (datum: Datum) => {
        return { name: "position", value: datum.position }
      }
    }
  }
  return (
    <section className={styles["graph"]}>
      <Pie {...config} />
    </section>
  )
}

export default AssetsGraph
