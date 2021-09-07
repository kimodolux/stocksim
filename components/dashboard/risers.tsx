import axios from "axios"
import useSwr from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const Risers = () => {
  const { data: risers, error: risersError } = useSwr(
    `/api/stocks/risers/`,
    fetcher
  )

  if (risersError)
    return <div>Failed to load risers data: {risersError.message}</div>
  if (!risers) return <div>Loading...</div>

  return risers.finance.result[0].quotes.map((s: any) => {
    return (
      <>
        <h4>{s.symbol}</h4>
      </>
    )
  })
}
