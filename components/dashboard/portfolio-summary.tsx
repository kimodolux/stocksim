import { CircularProgress, useTheme } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Link from "next/link"
import React from "react"
import Chart from "react-google-charts"
import { Profile } from "../../types/profile"
import { Stock } from "../../types/stocks"

export const PortfolioSummary = (props: {
  profile: Profile
  data: Stock[]
}) => {
  const { profile, data: stocks } = props
  const theme = useTheme()
  if (!profile || !stocks) return <CircularProgress />

  const portfolioData = profile.stocks.map((stockRef) => {
    const stockData = stocks.find(
      (stock: Stock) => stock.symbol === stockRef.symbol
    )
    return {
      ...stockData,
      amount: stockRef.amount,
    }
  })

  let totalAmounts = 0
  portfolioData.forEach((data) => (totalAmounts += data.amount))
  const pieChartRatio = totalAmounts / 100
  const chartData: any = portfolioData.map((data) => [
    data.shortName,
    data.amount / pieChartRatio,
    `<p>${data.shortName}</p><p>Value: $${(
      (data.regularMarketPreviousClose ?? 0) * data.amount
    )?.toFixed(2)}</p><p>Close price: $${
      data.regularMarketPreviousClose
    }</p><p>Amount: ${data.amount}</p>`,
  ])
  chartData.unshift([
    "Stock",
    "Percentage",
    { role: "tooltip", type: "string", p: { html: true } },
  ])

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Box margin="1em" boxShadow={1}>
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              tooltip: { isHtml: true, trigger: "visible" },
              pieHole: 0.5,
              pieSliceText: "none",
            }}
          />
        </Box>
        <Box boxShadow={1} padding="2em" margin="1em" bgcolor="white">
          <h2>Recent transactions</h2>

          {/* <ul>
                        <li>Hey</li>
                        <li>Ho</li>
                    </ul> */}
          <p>No recent transactions</p>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <h2>Money: ${profile.money}</h2>

        <Box bgcolor={theme.palette.secondary.main}>
          <h2>Stocks</h2>
          {profile.stocks.length === 0 && (
            <>
              <p>No stocks in your portfolio</p>
              <a href={`/portfolio}`}>Click here to browse stocks</a>
            </>
          )}
          {portfolioData.map((stock) => {
            return (
              <Link href={`/stocks/${stock.symbol}`}>
                <Box
                  boxShadow={1}
                  style={{ cursor: "pointer" }}
                  padding="0.5em"
                  margin="1em"
                  bgcolor="white"
                >
                  <Grid container>
                    <Grid item xs={6}>
                      {stock.symbol}
                    </Grid>
                    <Grid
                      item
                      container
                      xs={6}
                      justifyContent="flex-end"
                    >{`Amount: ${stock.amount}`}</Grid>
                  </Grid>
                </Box>
              </Link>
            )
          })}
        </Box>
      </Grid>
    </Grid>
  )
}
