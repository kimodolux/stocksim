import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core"
import axios from "axios"
import React, { useState } from "react"
import { Profile } from "../../types/profile"
import { Stock } from "../../types/stocks"

function TabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  )
}

export const BuySellDialog = (props: {
  profile: Profile
  stock: Stock
  mutateProfile: () => void
}) => {
  const { profile, stock, mutateProfile } = props
  const [loading, setLoading] = useState(false)

  const buyStock = async (symbol: string, amount: number) => {
    setLoading(true)
    await axios
      .post(`/api/stocks/${symbol}/buyStock?amount=${amount}`)
      .then((res) => res.data)
    mutateProfile()
    setLoading(false)
  }

  const sellStock = async (symbol: string, amount: number) => {
    setLoading
    await axios
      .post(`/api/stocks/${symbol}/sellStock?amount=${amount}`)
      .then((res) => res.data)
    mutateProfile()
    setLoading(false)
  }

  const [open, setOpen] = useState(false)
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [value, setValue] = useState(0)
  const [inputError, setInputError] = useState("")
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const confirmBuy = async () => {
    await buyStock(stock.symbol, parseInt(buyAmount))
    handleClose()
  }

  const confirmSell = async () => {
    await sellStock(stock.symbol, parseInt(sellAmount))
    handleClose()
  }

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }
  const stockRef = profile.stocks.find((s) => s.symbol === stock.symbol)
  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        But/sell stock
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Buy" />
          <Tab label="Sell" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DialogTitle>Buy stock</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Money: ${profile.money}</p>
              <p> Bid price: ${stock.bid}</p>
              {buyAmount && (
                <>
                  <p>
                    {" "}
                    Total price: $
                    {(stock.bid * parseInt(buyAmount ?? "0")).toFixed(2)}
                  </p>
                </>
              )}
            </DialogContentText>
            <TextField
              id="outlined-adornment-amount"
              value={buyAmount}
              error={!!inputError}
              helperText={inputError ?? ""}
              onChange={(e) => {
                if (parseInt(e.target.value ?? 0) * stock.bid > profile.money) {
                  setInputError("Not enough money")
                } else {
                  setBuyAmount(e.target.value.replace(/\D/, ""))
                }
              }}
              label="Amount"
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={
                loading ||
                isNaN(parseInt(buyAmount)) ||
                (parseInt(buyAmount) ?? 0) > (stockRef?.amount ?? 0)
              }
              onClick={confirmBuy}
            >
              Confirm
            </Button>
          </DialogActions>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DialogTitle>Sell stock</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>Stock owned: {stockRef?.amount ?? 0}</p>
              <p> Ask price: ${stock.ask}</p>
              {sellAmount && (
                <>
                  <p>
                    {" "}
                    Total sell price: $
                    {(stock.ask * parseInt(sellAmount ?? "0")).toFixed(2)}
                  </p>
                </>
              )}
            </DialogContentText>
            <TextField
              value={sellAmount}
              error={!!inputError}
              helperText={inputError ?? ""}
              onChange={(e) => {
                if (parseInt(e.target.value ?? 0) > (stockRef?.amount ?? 0)) {
                  setInputError("Not enough stock")
                } else {
                  setSellAmount(e.target.value.replace(/\D/, ""))
                }
              }}
              label="Amount"
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={
                loading ||
                isNaN(parseInt(sellAmount)) ||
                (parseInt(sellAmount) ?? 0) > (stockRef?.amount ?? 0)
              }
              onClick={confirmSell}
            >
              Confirm
            </Button>
          </DialogActions>
        </TabPanel>
      </Dialog>
    </>
  )
}
