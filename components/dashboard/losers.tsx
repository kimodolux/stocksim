import axios from "axios"
import useSwr from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const Losers = () =>{
    const { data: losers, error: losersError } = useSwr(
        `/api/stocks/losers/`,
        fetcher
    )

    if (losersError) return <div>Failed to load losers data: {losersError.message}</div>
    if (!losers) return <div>Loading...</div>
    return (
      losers.finance.result[2].quotes.map((s: any) => {
                  return (
                    <>
                    <h4>{s.symbol}</h4>
                    </>
                  )
                })
    )
}