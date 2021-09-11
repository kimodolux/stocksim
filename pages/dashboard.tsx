import React from "react"
import Layout from "../components/layout"
import { Box, CircularProgress, Grid, useTheme } from "@material-ui/core"
import { useSession } from "next-auth/client"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { Top5 } from "../components/dashboard/top5"
import { Risers } from "../components/dashboard/risers"
import { Losers } from "../components/dashboard/losers"
import { MyWatchlist } from "../components/dashboard/my-watchlist"

export default function DashboardPage() {
  const [session, loading] = useSession()
  const router = useRouter()
  const theme = useTheme()

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw" margin="auto">
        <h1>Dashboard</h1>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>My stocks</h2>
              <MyWatchlist />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Bigbois</h2>
              <Top5 />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Top Risers</h2>
              <Risers />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box
              boxShadow={1}
              padding="1em"
              bgcolor={theme.palette.secondary.main}
            >
              <h2>Top Fallers</h2>
              <Losers />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}
