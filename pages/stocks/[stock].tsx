import { useRouter } from "next/router"
import useSwr from "swr"
import axios from "axios"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../../types/stocks"
import Grid from "@material-ui/core/Grid"

const fetcher = (url: string) => axios.get(url).then((res) => res)

const StockPage = () => {
  const router = useRouter()
  const { stock: stockSymbol } = router.query
  const { data, error } = useSwr(`/api/stocks/${stockSymbol}`, fetcher)

  if (error) return <div>Failed to load stock data: {error.message}</div>
  if (!data) return <div>Loading...</div>
  const stock = data.data as Stock

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        <h1>{`${stock.longName} (${stock.symbol})`}</h1>
        <Grid container style={{ paddingTop: "2em", height: "50" }} spacing={1}>
          <Grid item xs={3}>
            <Box boxShadow={1} padding="1em">
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
                  <p>Previous Close:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.regularMarketPreviousClose}</b>
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
                <Grid item xs={6}>
                  <p>Beta:</p>
                </Grid>
                <Grid container item xs={6} justifyContent="flex-end">
                  <p>
                    <b>{stock.beta}</b>
                  </p>
                </Grid>
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
            <Box boxShadow={1} padding="5em">
              <h2>Graph coming soon</h2>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default StockPage
