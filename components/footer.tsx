import {
  Box,
  Button,
  Grid,
  useTheme,
  Link as OutsideLink,
} from "@material-ui/core"
import React from "react"
import GitHubIcon from "@material-ui/icons/GitHub"
import LinkedInIcon from "@material-ui/icons/LinkedIn"

export default function Footer() {
  const theme = useTheme()
  return (
    <footer>
      <Box
        bgcolor={theme.palette.secondary.main}
        padding="2em"
        minHeight="10vh"
        position="relative"
        bottom="0"
      >
        <Grid container justifyContent="flex-end">
          <Grid item xs={1} style={{ textAlign: "center" }}>
            <OutsideLink href="https://www.linkedin.com/in/cpid/">
              <Button>
                <LinkedInIcon color="primary" fontSize="large" />
              </Button>
            </OutsideLink>
          </Grid>
          <Grid item xs={1} style={{ textAlign: "center" }}>
            <OutsideLink href="https://github.com/kimodolux/stocksim">
              <Button>
                <GitHubIcon color="primary" fontSize="large" />
              </Button>
            </OutsideLink>
          </Grid>
        </Grid>
      </Box>
    </footer>
  )
}
