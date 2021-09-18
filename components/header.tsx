import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/client"
import React, { useState } from "react"
import {
  Box,
  Grid,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session] = useSession()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const maxMobileWidth = "599.95px"
  const isMobile = useMediaQuery(`(max-width:${maxMobileWidth})`)
  const open = Boolean(anchorEl && isMobile && session?.user)
  const handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box bgcolor={theme.palette.secondary.main} padding="2em">
      <Grid container>
        <Grid item xs={2}>
          <Link href="/">
            <Button
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault()
                  handleClick(e)
                }
              }}
            >
              <b style={{ fontSize: "1.5em" }}>StockSim</b>
            </Button>
          </Link>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Divider />
          <Link href="/dashboard">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Divider />
          <Link href="/stocks">
            <MenuItem>Stocks</MenuItem>
          </Link>
        </Menu>

        {!session && (
          <Grid item container justifyContent="flex-end" xs={10}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                signIn(undefined, {
                  callbackUrl: `${window.location.origin}/dashboard`,
                })
              }}
            >
              Sign in
            </Button>
          </Grid>
        )}
        {session?.user && (
          <>
            {!isMobile && (
              <>
                <Grid item xs={1} alignItems="center">
                  <Link href="/dashboard">
                    <Button color="primary" variant="text">
                      Dashboard
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={1} alignItems="center">
                  <Link href="/stocks">
                    <Button color="primary" variant="text">
                      Stocks
                    </Button>
                  </Link>
                </Grid>
                <Grid container item justifyContent="flex-end" xs={8}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        signOut()
                      }}
                    >
                      Sign out
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            {isMobile && (
              <Grid container item justifyContent="flex-end" xs={10}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      signOut()
                    }}
                  >
                    Sign out
                  </Button>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  )
}
