import { Box, Grid } from "@material-ui/core"
import React from "react"
import Footer from "../components/footer"
import Layout from "../components/layout"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"

export default function Page() {
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
      <Box bgcolor="black" padding="10vh 10vw 10vh 10vw">
        <Grid container alignItems="center">
          <Grid item xs={6} style={{ color: "white", textAlign: "center" }}>
            <AccountBalanceIcon fontSize="large" />
            <br />
            <h3>Start with $100,000 AUD</h3>
          </Grid>
          <Grid item xs={6} style={{ color: "white", textAlign: "center" }}>
            <AccountBalanceWalletIcon fontSize="large" />
            <br />
            <h3>Build a portfolio from US and Asian markets</h3>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ color: "white", textAlign: "center", paddingTop: "2em" }}
          >
            <ShowChartIcon fontSize="large" />
            <br />
            <h3>Track price changes in real time</h3>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ color: "white", textAlign: "center", paddingTop: "2em" }}
          >
            <MonetizationOnIcon fontSize="large" />
            <br />
            <h3>Maximise profit</h3>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Layout>
  )
}
