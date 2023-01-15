import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

const defaultState = {
  addToCart: (_id: string) => {},
  removeFromCart: (_id: string) => {},
  cart: [] as any,
}

export const CartContext = createContext<typeof defaultState>(defaultState)

const CartContextProvider = (props: PropsWithChildren) => {
  const [cart, setCart] = useState<any>([])

  const addToCart = (id: string) => {
    const oldValue = cart.find((cart: any) => cart.id === id)

    if (!oldValue) {
      setCart((cart: any) => [...cart, { id, qty: 1 }])
    } else {
      setCart((cart: any) => [
        ...cart.filter((cart: any) => cart.id !== id),
        {
          id,
          qty: oldValue.qty + 1,
        },
      ])
    }
  }

  const removeFromCart = (id: string) => {
    const oldValue = cart.find((cart: any) => cart.id === id)

    if (!oldValue) return

    if (oldValue.qty === 1) {
      setCart((cart: any) => [...cart.filter((cart: any) => cart.id !== id)])
    } else {
      setCart((cart: any) => [
        ...cart.filter((cart: any) => cart.id !== id),
        {
          id,
          qty: oldValue.qty - 1,
        },
      ])
    }
  }

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, cart }}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartContextProvider

export const useCart = () => {
  return useContext(CartContext)
}
