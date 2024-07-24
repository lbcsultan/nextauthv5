import { auth } from '@/auth'

export default async function Middleware() {
  const session = await auth()
  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Middleware protected page </h1>
      <p className="text-lg">Email: {session?.user?.email}</p>
      <p className="text-lg">Name: {session?.user?.name}</p>
    </main>
  )
}
