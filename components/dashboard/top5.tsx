import axios from "axios"
import useSwr from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const Top5 = () =>{
    const { data: bigBois, error: bigBoisError } = useSwr(
        `/api/stocks/bigBois/`,
        fetcher
    )

    if (bigBoisError) return <div>Failed to load dashboard data: {bigBoisError.message}</div>
    if (!bigBois) return <div>Loading...</div>

    return (
        bigBois.map((bb: any) => {
                  return (
                    <>
                    <h4>{bb.name}</h4>
                    <p>{`$${bb.close}`}</p>
                    </>
                  )
                })
    )
}