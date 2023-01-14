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
    const storage_item = localStorage.getItem('auth')
    if (storage_item) {
      setAuthUser(JSON.parse(storage_item))
    }
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
