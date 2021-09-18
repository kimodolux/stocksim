import { useSession } from "next-auth/client"
import useSwr from "swr"
import { fetcher } from "../../utils/api"

export default function ProfileDetails() {
  const [session] = useSession()
  const { data, error } = useSwr(`/api/profile`, fetcher)
  if (!data) {
    return <p>loading</p>
  }

  return (
    <>
      <h1>User details</h1>
      <p>{data.profileId}</p>
    </>
  )
}
