import useSwr from "swr"
import axios from "axios"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"
import { Stock } from "../../types/stocks"
import Link from "next/link"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const StockInfo = (props: { stock: Stock }) => {
  const { stock } = props
  return (
    <div style={{ paddingTop: "1em" }}>
      <Link href={`/stocks/${stock.symbol}`}>
        <Box boxShadow={1} padding="1em" style={{ cursor: "pointer" }}>
          <h3>{`${stock.longName} (${stock.symbol})`}</h3>
        </Box>
      </Link>
    </div>
  )
}

const StockPage = () => {
  const { data, error } = useSwr(`/api/stocks`, fetcher)

  if (error) return <div>Failed to load stock data: {error.message}</div>
  if (!data) return <div>Loading...</div>

  console.log(data)
  return (
    <Layout>
      <Box padding="10vw">
        <h1>Stocks</h1>
        {data.map((stock: Stock) => (
          <StockInfo stock={stock} />
        ))}
      </Box>
    </Layout>
  )
}

export default StockPage
