import React from "react"
import Layout from "../components/layout"
import { Box, CircularProgress, Grid } from "@material-ui/core"
import { useSession } from "next-auth/client"
import { useEffect } from "react";
import { useRouter } from 'next/router'
import useSwr from 'swr'
import axios from "axios"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Dashboard() {
  const [session, loading] = useSession();
  const router = useRouter()

    useEffect(() => {
        if(!loading && !session?.user){
            router.push("/");
        }
    }, [session])

    const { data, error } = useSwr(
      `/api/stocks/basic/IBM`,
      fetcher
  )   

  const price = data["Global Quote"]["05. price"];

      if (error) return <div>Failed to load dashboard data: {error.message}</div>
      if (!data) return <div>Loading...</div>
  return (
    <Layout>
      <Box padding="10vw">
        {loading && <CircularProgress />}
        <h1>Dashbaord</h1>
        <Grid container >
            <Grid item xs={3}>
                <h2>My stocks</h2>
            </Grid>
            <Grid item xs={3}>
                <h2>Bigbois</h2>
                <h4>IBM</h4>
                {`IBM price: $${price}` }

            </Grid>
            <Grid item xs={3}>
                <h2>Top Risers</h2>
            </Grid>
            <Grid item xs={3}>
                <h2>Top Faller</h2>
            </Grid>
            
        </Grid>
      </Box>
    </Layout>
  )
}
