'use server'

import { signIn, signOut } from '@/auth'
import prisma from '@/db'
import { saltAndHashPassword } from '@/utils/helper'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' })
  revalidatePath('/')
}

export const logout = async () => {
  await signOut({ redirectTo: '/' })
  revalidatePath('/')
}

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
    role: 'ADMIN',
    redirectTo: '/',
  }

  const existingUser = await getUserByEmail(formData.get('email') as string)
  console.log(existingUser)

  try {
    await signIn('credentials', rawFormData)
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    throw error
  }
  revalidatePath('/')
}

export const register = async (formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password')

  if (!name || !email || !password) {
    throw new Error('Please fill all fields')
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    throw new Error('user already exists')
    return
  }

  const hashedPassword = saltAndHashPassword(password)

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  console.log('User created successfully')

  redirect('/sign-in')
}
