import { useSession } from "next-auth/client"
import axios from "axios"
import useSwr from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

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
