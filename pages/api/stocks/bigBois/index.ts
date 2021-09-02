import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const top5 = ["IBM", "GOOG", "AAPL", "AMZN", "FB"]

    const options1 = {
        method: "GET",
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
        params: {symbol: top5[0], region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a'
        }
    } as AxiosRequestConfig;
    const options2 = {
        method: "GET",
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
        params: {symbol: top5[1], region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a'
        }
    } as AxiosRequestConfig;
    const options3 = {
        method: "GET",
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
        params: {symbol: top5[2], region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a'
        }
    } as AxiosRequestConfig;
    const options4 = {
        method: "GET",
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
        params: {symbol: top5[3], region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a'
        }
    } as AxiosRequestConfig;
    const options5 = {
        method: "GET",
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
        params: {symbol: top5[4], region: 'US'},
        headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '58df62ff42msh8793499b238713ep16bc08jsn2071a1072d6a'
        }
    } as AxiosRequestConfig;

    try{
        const response1 = await axios.request(options1);
        const response2 = await axios.request(options2);
        const response3 = await axios.request(options3);
        const response4 = await axios.request(options4);
        const response5 = await axios.request(options5);

        const data = [response1.data.prices[0], response2.data.prices[0], response3.data.prices[0], response4.data.prices[0], response5.data.prices[0]]
        
        const returnData = data.map((s, i) => {
            const stockObject = {
                ...s,
                name: top5[i]
            }
            return stockObject;
        })

        return res.status(200).json(returnData);    
    }
    catch(e: any){
        console.log(e.message)
    }
    
  }