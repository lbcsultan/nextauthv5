import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col gap-4 h-full items-center justify-center">
      <h1 className="text-3xl">Landing Page</h1>
      <p>Middleware protected page : /middleware</p>
      <p>Server protected page : /server</p>
      <p>Server-side api protection : /api/data </p>
    </main>
  )
}
