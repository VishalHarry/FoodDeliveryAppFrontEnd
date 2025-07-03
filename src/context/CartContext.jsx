"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addToCart = (product, variant = null) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant),
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          variant,
          cartId: `${product.id}-${Date.now()}`,
        },
      ]
    })
  }

  const removeFromCart = (cartId) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity === 0) {
      removeFromCart(cartId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)))
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
