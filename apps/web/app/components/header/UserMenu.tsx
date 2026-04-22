// app/ui/user-menu.tsx
'use client'

type HeaderUser = {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
}

export function UserMenu({ user }: { user: HeaderUser }) {
  return (
    <button className="flex items-center gap-3 ">
      <img
        src={user.avatarUrl ?? '/default-avatar.png'}
        alt={user.name}
        className="h-8 w-8 rounded-full px-20 object-cover bg-white"
      />
      {/* <div className="text-sm">
        <p>{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </div> */}
    </button>
  )
}
