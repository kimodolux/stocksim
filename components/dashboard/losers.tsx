import { CircularProgress } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Link from "next/link"
import React from "react"
import useSwr from "swr"
import { Stock } from "../../types/stocks"
import { fetcher } from "../../utils/api"

export const Losers = () => {
  const { data: losers, error: losersError } = useSwr(
    `/api/stocks/losers/`,
    fetcher
  )

  if (losersError)
    return <div>Failed to load losers data: {losersError.message}</div>
  if (!losers) return <CircularProgress />

  return losers.map((stock: Stock) => {
    return (
      <Box marginBottom="1em" bgcolor="white" key={stock.symbol}>
        <Link href={`/stocks/${stock.symbol}`}>
          <Box
            boxShadow={1}
            padding="0 1em 0 1em"
            style={{ cursor: "pointer" }}
          >
            <Grid container>
              <Grid item xs={6}>
                <h4>{stock.symbol}</h4>
              </Grid>
              <Grid container item justifyContent="flex-end" xs={6}>
                <p>{`${stock.bid.toFixed(
                  2
                )} (${stock.regularMarketChangePercent.toFixed(2)}% )`}</p>
              </Grid>
            </Grid>
          </Box>
        </Link>
      </Box>
    )
  })
}
