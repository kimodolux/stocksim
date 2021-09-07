import { useRouter } from "next/router"
import useSwr from "swr"
import axios from "axios"
import React from "react"
import Layout from "../../components/layout"
import Box from "@material-ui/core/Box"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Stock = () => {
  const router = useRouter()
  const { stock } = router.query

  const { data, error } = useSwr(`/api/stocks/${stock}`, fetcher)

  if (error) return <div>Failed to load stock data: {error.message}</div>
  if (!data) return <div>Loading...</div>

  console.log(data)
  return (
    <Layout>
      <Box padding="10vw">
        <h1>Stock: {stock}</h1>
      </Box>
    </Layout>
  )
}

export default Stock
