import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { AuthUser } from '../types/types'

const defaultState = {
  authUser: {} as AuthUser | null,
  login: (_data: AuthUser) => {},
  logout: () => {},
}

export const AuthContext = createContext<typeof defaultState>(defaultState)

const AuthContextProvider = (props: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  const login = (data: AuthUser) => {
    setAuthUser(data)
  }

  const logout = () => {
    setAuthUser(null)
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
