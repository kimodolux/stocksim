import React from "react"
import Layout from "../components/layout"
import { Box, CircularProgress, Grid } from "@material-ui/core"
import { useSession } from "next-auth/client"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { Top5 } from "../components/dashboard/top5"
import { Risers } from "../components/dashboard/risers"
import { Losers } from "../components/dashboard/losers"
import { MyWatchlist } from "../components/dashboard/my-watchlist"

export default function Dashboard() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session?.user) {
      router.push("/")
    }
  }, [session])

  return (
    <Layout>
      <Box padding="10vw">
        {loading && <CircularProgress />}
        <h1>Dashbaord</h1>
        <Grid container>
          <Grid item xs={3}>
            <h2>My stocks</h2>
            <MyWatchlist />
          </Grid>
          <Grid item xs={3}>
            <h2>Bigbois</h2>
            <Top5 />
          </Grid>
          <Grid item xs={3}>
            <h2>Top Risers</h2>
            {/* <Risers /> */}
          </Grid>
          <Grid item xs={3}>
            <h2>Top Fallers</h2>
            {/* <Losers /> */}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}
