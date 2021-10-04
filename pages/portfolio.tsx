import useSwr from "swr"
import React from "react"
import Layout from "../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../types/stocks"
import Link from "next/link"
import Grid from "@material-ui/core/Grid"
import { CircularProgress, useTheme } from "@material-ui/core"
import { fetcher } from "../utils/api"
import { Profile } from "../types/profile"

const StockInfo = (props: { stock: Stock; profile: Profile }) => {
  const theme = useTheme()
  const { stock, profile } = props
  const marketChange = stock.regularMarketChange
  const changeColor =
    marketChange > 0 ? "green" : marketChange < 0 ? "red" : "black"
  const price = stock.regularMarketPreviousClose.toFixed(2)

  const myStocks = profile.stocks
  const watchingStock = myStocks.some((s) => s.symbol === stock.symbol)

  const priceChange =
    marketChange > 0
      ? `+${marketChange.toFixed(
          2
        )} (${stock.regularMarketChangePercent.toFixed(2)}%)`
      : `${marketChange.toFixed(2)} (${stock.regularMarketChangePercent.toFixed(
          2
        )}%)`

  return (
    <Box marginTop="1em" bgcolor={theme.palette.secondary.main}>
      <Link href={`/stocks/${stock.symbol}`}>
        <Box boxShadow={1} padding="1em" style={{ cursor: "pointer" }}>
          <Grid container>
            <Grid item md={9} xs={6}>
              <h3>{`${stock.longName} (${stock.symbol})`}</h3>
            </Grid>
            <Grid
              md={3}
              xs={6}
              item
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item md={4} xs={6}>
                <h4>{price}</h4>
              </Grid>
              <Grid item md={4} xs={6} style={{ color: changeColor }}>
                <p>{priceChange}</p>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  )
}

const Portfolio = () => {
  const theme = useTheme()
  const { data: stockData, error: stockError } = useSwr(
    `/api/stocks/portfolio`,
    fetcher
  )
  const { data: profileData, error: profileError } = useSwr(
    `/api/profile`,
    fetcher
  )

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        <h1>Watchlist</h1>
        {stockError && <h2>Failed to load stock data: {stockError.message}</h2>}
        {profileError && (
          <h2>Failed to load profile data: {profileError.message}</h2>
        )}
        {!stockError && !stockData && !profileError && !profileData && (
          <CircularProgress />
        )}
        {stockData.length === 0 && (
          <Box
            padding="4em"
            marginTop="1em"
            bgcolor={theme.palette.secondary.main}
          >
            <h2>
              You are currently not tracking any stocks.{"   "}
              <Link href="/stocks" as="/stocks">
                Choose stocks to add to your list
              </Link>
            </h2>
          </Box>
        )}
        {stockData &&
          profileData &&
          stockData.map((stock: Stock) => {
            return (
              <StockInfo
                stock={stock}
                key={stock.symbol}
                profile={profileData}
              />
            )
          })}
      </Box>
    </Layout>
  )
}

export default Portfolio
