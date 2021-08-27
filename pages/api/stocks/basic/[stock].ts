import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stock: stockSymbol } = req.query
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.AV_API_KEY}`
    try{
        const response = await axios.get(url);
        if(response){
            res.status(200).json(response.data);
        }
        else{
            res.status(300);
            res.end()
        } 
    }
    catch(e: any){
        console.log(e.message)
    }
    
  }