import axios from 'axios'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { AuthUser } from '../types/types'

const defaultState = {
  authUser: {} as AuthUser | null,
  login: (_data: AuthUser) => {},
  logout: () => {},
}

export const AuthContext = createContext<typeof defaultState>(defaultState)

const AuthContextProvider = (props: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    ;(async () => {
      const storage_item = localStorage.getItem('auth')

      if (storage_item) {
        const res = await axios
          .get(process.env.NEXT_PUBLIC_API_URL + '/auth/me', {
            headers: {
              Authorization: `Bearer ${JSON.parse(storage_item).token}`,
            },
          })
          .catch(() => localStorage.removeItem('auth'))

        if (!res) return

        const { data: response } = res

        const me = {
          email: response.data.email,
          role: response.data.role,
          token: JSON.parse(storage_item).token,
        }

        localStorage.setItem('auth', JSON.stringify(me))

        setAuthUser(me)
      }
    })()
  }, [])

  const login = (data: AuthUser) => {
    setAuthUser(data)
    localStorage.setItem('auth', JSON.stringify(data))
  }

  const logout = () => {
    setAuthUser(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

export const useAuth = () => {
  return useContext(AuthContext)
}
