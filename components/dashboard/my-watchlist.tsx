import Link from "next/link"

export const MyWatchlist = () => {
  return (
    <>
      <p>No tracked stocks yet...</p>
      <Link href="/stocks" as="/stocks">
        Choose stocks to add to your list
      </Link>
    </>
  )
}
