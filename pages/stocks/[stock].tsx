import { useRouter } from "next/router"
import useSwr from "swr"
import axios from "axios"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../../types/stocks"
import Grid from "@material-ui/core/Grid"
import { CircularProgress, useTheme } from "@material-ui/core"

const fetcher = (url: string) => axios.get(url).then((res) => res)

const StockPage = () => {
  const router = useRouter()
  const theme = useTheme()
  const { stock: stockSymbol } = router.query
  const { data, error } = useSwr(`/api/stocks/${stockSymbol}`, fetcher)

  if (error) return <div>Failed to load stock data: {error.message}</div>
  if (!data)
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    )

  const stock = data.data as Stock
  const marketChange = stock.regularMarketChange
  const changeColor =
    marketChange > 0 ? "green" : marketChange < 0 ? "red" : "black"
  const price = stock.regularMarketPreviousClose.toFixed(2)

  const priceChange =
    marketChange > 0
      ? `+${marketChange.toFixed(
          2
        )} (${stock.regularMarketChangePercent.toFixed(2)}%)`
      : `${marketChange.toFixed(2)} (${stock.regularMarketChangePercent.toFixed(
          2
        )}%)`

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        <h2>{`${stock.longName} (${stock.symbol})`}</h2>
        <Box width="30%">
          <h1 style={{ display: "inline" }}>{price}</h1>{" "}
          <h2 style={{ display: "inline", color: changeColor }}>
            {priceChange}
          </h2>
        </Box>
        <Grid container style={{ paddingTop: "2em", height: "50" }} spacing={1}>
          <Grid item xs={3}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <Grid container>
                <Grid item xs={6}>
                  <p>Open:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.regularMarketOpen}</b>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Bid:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.bid}</b>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Ask:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.ask}</b>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Market Cap:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.marketCap}</b>
                  </p>
                </Grid>
                {stock.beta && (
                  <>
                    <Grid item xs={6}>
                      <p>Beta:</p>
                    </Grid>
                    <Grid container item xs={6} justifyContent="flex-end">
                      <p>
                        <b>{stock.beta}</b>
                      </p>
                    </Grid>{" "}
                  </>
                )}
                <Grid item xs={6}>
                  <p>Yearly High:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.fiftyTwoWeekHigh}</b>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Yearly Low:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.fiftyTwoWeekLow}</b>
                  </p>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box
              boxShadow={1}
              padding="5em"
              height="100%"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Graph coming soon</h2>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default StockPage
