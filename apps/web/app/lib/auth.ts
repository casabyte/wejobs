// app/lib/auth.ts
import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'

export type HeaderUser = {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
}

export const getCurrentUser = cache(async (): Promise<HeaderUser | null> => {
  const token = (await cookies()).get('session_token')?.value
  console.log('Token from cookies:', token);
  if (!token) return null

//   const res = await fetch(`${process.env.NEST_API_URL}/auth/me`, {
  const res = await fetch(`http://localhost:3040/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  console.log(res);

  if (!res.ok) return null

  const user = await res.json()

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? null,
  }
})
