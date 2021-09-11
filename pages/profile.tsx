import React from "react"
import Layout from "../components/layout"
import { Box, CircularProgress } from "@material-ui/core"
import { useSession } from "next-auth/client"
import ProfileDetails from "../components/account/profileDetails"
import CreateProfile from "../components/account/createProfile"

export default function ProfilePage() {
  const [session, loading] = useSession()

  return (
    <Layout>
      <Box padding="5vh 10vw 5vh 10vw">
        {loading && <CircularProgress />}
        {!loading && session?.user.profileId && <ProfileDetails />}
        {!loading && !session?.user.profileId && <CreateProfile />}
      </Box>
    </Layout>
  )
}
