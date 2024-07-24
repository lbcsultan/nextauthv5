import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Server() {
  const session = await auth()
  if (!session?.user) {
    redirect('/')
  }
  return (
    <main className="flex h-full items-center justify-center flex-col gap-4">
      <h1 className="text-3xl">Server protected page </h1>
      <p className="text-lg">
        Server-side session is checked and this page is shown only when the user
        is logged in. <br />
        If user is not logged in, it is redirected to root page.
      </p>
      <p className="text-lg">Email: {session?.user?.email}</p>
      <p className="text-lg">Name: {session?.user?.name}</p>
    </main>
  )
}
