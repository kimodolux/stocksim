import { Box, Grid, useTheme } from "@material-ui/core"
import React, { useEffect } from "react"
import Footer from "../components/footer"
import Layout from "../components/layout"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import { useRouter } from "next/router"
import { signIn, useSession } from "next-auth/client"
import { Button } from "@material-ui/core"

export default function Home() {
  const [session, loading] = useSession()
  const router = useRouter()
  const theme = useTheme()
  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw" justifyContent="center">
        <h1>StockSim</h1>
        <h2>
          Buy and sell stocks in real time. StockSim is a stock market simulator
          that allows users to use virtual money to practice stock buying and
          selling without investing real money.
        </h2>
      </Box>
      <Box padding="10vh 10vw 5vh 10vw" bgcolor={"#A9A9A9"} textAlign="center">
        <Grid container alignItems="center">
          <Grid item xs={6} style={{ color: "black" }}>
            <AccountBalanceIcon fontSize="large" />
            <br />
            <h3>Start with $100,000 AUD</h3>
          </Grid>
          <Grid item xs={6} style={{ color: "black", textAlign: "center" }}>
            <AccountBalanceWalletIcon fontSize="large" />
            <br />
            <h3>Build a portfolio from ASX 200</h3>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ color: "black", textAlign: "center", paddingTop: "2em" }}
          >
            <ShowChartIcon fontSize="large" />
            <br />
            <h3>Track price changes in real time</h3>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ color: "black", textAlign: "center", paddingTop: "2em" }}
          >
            <MonetizationOnIcon fontSize="large" />
            <br />
            <h3>Maximise profit</h3>
          </Grid>
        </Grid>
        <Button
          style={{ marginTop: "2em" }}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            if (!session?.user) {
              signIn(undefined, {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            } else {
              router.push("/dashboard")
            }
          }}
        >
          Get started
        </Button>
      </Box>
      <Footer />
    </Layout>
  )
}
