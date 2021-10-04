import React from "react"
import Layout from "../components/layout"
import { Box, CircularProgress, Grid, useTheme } from "@material-ui/core"
import { useSession } from "next-auth/client"
import useSwr from "swr"
import { PortfolioSummary } from "../components/dashboard/portfolio-summary"
import { fetcher } from "../utils/api"
import { Stocklist } from "../components/dashboard/stock-list"
import { Stock } from "../types/stocks"

const getQueryFromArray = (ids: string[]) => {
  let protfolioQuery = "ids="
  ids.forEach((id: string) => {
    protfolioQuery = protfolioQuery.concat(`${encodeURIComponent(id)},`)
  })
  // remove last comma
  return protfolioQuery.substring(0, protfolioQuery.length - 1)
}

export default function DashboardPage() {
  const [session, loading] = useSession()
  const theme = useTheme()
  const { data: profile, error: profileError } = useSwr(
    `/api/profile/`,
    fetcher
  )
  const portfolioIds =
    profile?.stocks?.map((stock: Stock) => stock.symbol) ?? []
  const protfolioQuery = getQueryFromArray(portfolioIds)
  const { data: portfolioData } = useSwr(
    portfolioIds ? `/api/stocks/portfolio?${protfolioQuery}` : null,
    fetcher
  )
  const { data: losers, error: losersError } = useSwr(
    `/api/stocks/losers/`,
    fetcher
  )
  const { data: risers, error: risersError } = useSwr(
    `/api/stocks/risers/`,
    fetcher
  )
  const { data: bigBois, error: bigBoisError } = useSwr(
    `/api/stocks/bigBois/`,
    fetcher
  )
  const { data: transactionsData } = useSwr(
    `/api/profile/transactions/`,
    fetcher
  )

  if (loading) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    )
  }
  if (!session?.user) {
    return (
      <Layout>
        <h1>Please log in to continue</h1>
      </Layout>
    )
  }
  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw" margin="auto">
        <h1>Dashboard</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
              width="100%"
              height="100%"
            >
              <PortfolioSummary
                profile={profile}
                data={portfolioData}
                transactions={transactionsData}
              />
            </Box>
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Bigbois</h2>
              <Stocklist data={bigBois} error={bigBoisError} />
            </Box>
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Top Risers</h2>
              <Stocklist data={risers} error={risersError} />
            </Box>
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Top Fallers</h2>
              <Stocklist data={losers} error={losersError} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}
