import NextAuth from 'next-auth'

import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from '@/db'
import { saltAndHashPassword } from './utils/helper'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Github,
    Google,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null
        }
        const email = credentials.email as string
        const hash = saltAndHashPassword(credentials.password)

        let user: any = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          throw new Error('User not found.')
          return null
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword
          )
          if (!isMatch) {
            throw new Error('Incorrect password.')
          }
          return user
        }
      },
    }),
  ],
})
