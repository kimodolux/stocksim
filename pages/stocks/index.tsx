import useSwr, { useSWRInfinite, mutate } from "swr"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../../types/stocks"
import Link from "next/link"
import Grid from "@material-ui/core/Grid"
import { Button, CircularProgress, useTheme } from "@material-ui/core"
import StarIconOutlined from "@material-ui/icons/StarBorderOutlined"
import StarIcon from "@material-ui/icons/Star"
import { fetcher } from "../../utils/api"
import { Profile } from "../../types/profile"
import axios from "axios"

const addToWatchlist = async (stock: Stock, mutateProfile: () => void) => {
  await axios.post(`/api/stocks/${stock.symbol}`).then((res) => res.data)
  mutateProfile()
}

const removeFromWatchlist = async (stock: Stock, mutateProfile: () => void) => {
  await axios.delete(`/api/stocks/${stock.symbol}`).then((res) => res.data)
  mutateProfile()
}

const StockInfo = (props: {
  stock: Stock
  profile: Profile
  mutateProfile: () => void
}) => {
  const theme = useTheme()
  const { stock, profile, mutateProfile } = props
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
            <Grid item xs={9}>
              <h3>{`${stock.longName} (${stock.symbol})`}</h3>
            </Grid>
            <Grid
              xs={3}
              item
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={4} justifyContent="center">
                {!watchingStock && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      addToWatchlist(stock, mutateProfile)
                    }}
                  >
                    <StarIconOutlined />
                  </Button>
                )}
                {watchingStock && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      removeFromWatchlist(stock, mutateProfile)
                    }}
                  >
                    <StarIcon />
                  </Button>
                )}
              </Grid>
              <Grid item xs={4}>
                <h4>{price}</h4>
              </Grid>
              <Grid item xs={4} style={{ color: changeColor }}>
                <p>{priceChange}</p>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Box>
  )
}

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null
  return `/api/stocks?page=${pageIndex}&limit=10`
}

const StockPage = () => {
  const {
    data: stockData,
    error: stockError,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher)
  const {
    data: profileData,
    error: profileError,
    mutate: mutateProfile,
  } = useSwr(`/api/profile`, fetcher)
  const isReachingEnd =
    stockData?.[0]?.length === 0 ||
    (stockData && stockData[stockData.length - 1]?.length < 10)
  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        <h1>Stocks</h1>
        {stockError && <h2>Failed to load stock data: {stockError.message}</h2>}
        {profileError && (
          <h2>Failed to load profile data: {profileError.message}</h2>
        )}
        {!stockError && !stockData && !profileError && !profileData && (
          <CircularProgress />
        )}
        {stockData &&
          profileData &&
          stockData.map((response: Stock[]) => {
            return response.map((stock: Stock) => {
              return (
                <StockInfo
                  stock={stock}
                  key={stock.symbol}
                  profile={profileData}
                  mutateProfile={mutateProfile}
                />
              )
            })
          })}
        {!isReachingEnd && (
          <Box textAlign="center">
            <Button
              style={{ marginTop: "2em" }}
              variant="contained"
              color="primary"
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default StockPage
