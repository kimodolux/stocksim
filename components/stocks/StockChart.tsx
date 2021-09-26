import React from "react"
import { Chart } from "react-google-charts"
import { Stock } from "../../types/stocks"
import useSwr from "swr"
import { fetcher } from "../../utils/api"
import { CircularProgress } from "@material-ui/core"

export const StockChart = (props: { stock: Stock }) => {
  const { stock } = props
  const { data: chartData, error: chartError } = useSwr(
    `/api/stocks/${stock.symbol}/chart`,
    fetcher
  )

  if (chartError)
    return <div>Failed to load chart data: {chartError.message}</div>
  if (!chartData) return <CircularProgress />
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="CandlestickChart"
      loader={<div>Loading Chart</div>}
      data={chartData.data}
      options={{
        tooltip: { isHtml: true, trigger: "visible" },
        bar: { groupWidth: "100%" },
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "#a52714" },
          risingColor: { strokeWidth: 0, fill: "#0f9d58" },
        },
      }}
    />
  )
}
