import { loginWithCreds } from '@/actions/authServer'

import LoginButton from './LoginButton'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div>
      <form className="w-full flex flex-col gap-4" action={loginWithCreds}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="mt-2 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="mt-2 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div className="mt-2">
          <LoginButton />
        </div>

        <p className="text-gray-200 text-sm max-w-sm mt-2">
          Dont have an account?{' '}
          <Link href="/register" className="text-blue-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
