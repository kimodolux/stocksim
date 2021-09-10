import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/client"
import React from "react"
import { Box, Grid, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session] = useSession()
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.secondary.main} padding="2em">
      <Grid container>
        <Grid item xs={2}>
          <Link href="/">
            <b style={{ fontSize: "2em" }}>StockSim</b>
          </Link>
        </Grid>

        {!session && (
          <Grid item container justifyContent="flex-end">
            <Grid item>
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
          </Grid>
        )}
        {session?.user && (
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
      </Grid>
    </Box>
  )
}
{
  /* <Grid container item xs={6}>
            <Link href="account">
              <Button>
                <Avatar src={session.user.image ?? undefined} sizes="large" />
              </Button>
            </Link>

            <p style={{ marginLeft: "1em" }}>
              Signed in as{" "}
              <strong>{session.user.email || session.user.name}</strong>
            </p>
          </Grid> */
}
