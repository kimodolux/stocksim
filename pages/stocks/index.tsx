import useSwr from "swr"
import axios from "axios"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../../types/stocks"
import Link from "next/link"
import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const StockInfo = (props: { stock: Stock }) => {
  const theme = useTheme()
  const { stock } = props
  const marketChange = stock.regularMarketChange
  const changeColor =
    marketChange > 0 ? "green" : marketChange < 0 ? "red" : "black"
  const price = stock.bid.toFixed(2)

  const priceChange =
    marketChange > 0
      ? `+${marketChange.toFixed(
          2
        )} (${stock.regularMarketChangePercent.toFixed(2)}%)`
      : `${marketChange.toFixed(2)} (${stock.regularMarketChangePercent.toFixed(
          2
        )}%)`

  return (
    <Box paddingTop="1em" bgcolor={theme.palette.secondary.main}>
      <Link href={`/stocks/${stock.symbol}`}>
        <Box boxShadow={1} padding="1em" style={{ cursor: "pointer" }}>
          <Grid container>
            <Grid item xs={9}>
              <h3>{`${stock.longName} (${stock.symbol})`}</h3>
            </Grid>
            <Grid xs={3} item container justifyContent="flex-end">
              <Grid item xs={6}>
                <h4>{price}</h4>
              </Grid>
              <Grid item xs={6} style={{ color: changeColor }}>
                <p>{priceChange}</p>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  )
}

const StockPage = () => {
  const { data, error } = useSwr(`/api/stocks`, fetcher)

  if (error) return <div>Failed to load stock data: {error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        <h1>Stocks</h1>
        {data.map((stock: Stock) => (
          <StockInfo stock={stock} key={stock.symbol} />
        ))}
      </Box>
    </Layout>
  )
}

export default StockPage
