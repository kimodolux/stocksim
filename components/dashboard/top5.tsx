import { CircularProgress, useTheme } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import axios from "axios"
import Link from "next/link"
import React from "react"
import useSwr from "swr"
import { Stock } from "../../types/stocks"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const Top5 = () => {
  const { data: bigBois, error: bigBoisError } = useSwr(
    `/api/stocks/bigBois/`,
    fetcher
  )
  const theme = useTheme()

  if (bigBoisError)
    return <div>Failed to load dashboard data: {bigBoisError.message}</div>
  if (!bigBois) return <CircularProgress />

  return bigBois.map((stock: Stock) => {
    return (
      <Box marginBottom="1em" bgcolor="white">
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
