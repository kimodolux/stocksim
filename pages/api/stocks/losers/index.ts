import type { NextApiRequest, NextApiResponse } from "next"
import axios, { AxiosRequestConfig } from "axios"
import { getSession } from "next-auth/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(403)
  }
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers",
    params: { count: 5, region: "US" },
    headers: {
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": "58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a",
    },
  } as AxiosRequestConfig

  try {
    const response = await axios.request(options)

    return res.status(200).json(response.data)
  } catch (e: any) {
    console.log(e.message)
  }
}
