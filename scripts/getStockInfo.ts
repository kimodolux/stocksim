import axios, { AxiosRequestConfig } from "axios"
import * as fs from "fs"
import * as path from "path"
import { db } from "../firebase"

// ASX200 symbols are split into 5 files and taken to query yahoo finance API

export const main = async () => {
  const stocks = db.collection("stocks")

  for (let x = 1; x <= 5; x++) {
    const filePath = path.join(__dirname, `ASX200-${x}.txt`)
    fs.readFile(filePath, async (err, data) => {
      const symbols = data.toString().replace(/\n/g, ".AX,")

      var options = {
        method: "GET",
        url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes",
        params: { region: "AU", symbols: symbols },
        headers: {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPID_API_KEY,
        },
      } as AxiosRequestConfig

      const response = await axios.request(options)

      let count = 1
      try {
        response.data.quoteResponse.result.forEach((s: any) => {
          stocks.doc(s.symbol).set(s)
          console.log(`symbol ${count} of 40`)
          count++
        })
      } catch (e: any) {
        console.log(e.message)
      }
    })
  }
}

main()
