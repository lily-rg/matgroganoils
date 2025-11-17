import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  size?: string
  quantity: number
}

export type Painting = {
  id: number
  title: string
  price: number
  image: string
  size: string
  description: string
  available: boolean
}

type CartState = {
  items: CartItem[]
  addItem: (painting: Painting, qty?: number) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clear: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartState | undefined>(undefined)

const STORAGE_KEY = 'mgo_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addItem = (painting: Painting, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === painting.id)
      if (existing) {
        return prev.map(i => (i.id === painting.id ? { ...i, quantity: i.quantity + qty } : i))
      }
      const item: CartItem = {
        id: painting.id,
        title: painting.title,
        price: painting.price,
        image: painting.image,
        size: painting.size,
        quantity: qty,
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: number, qty: number) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)))
  }

  const clear = () => setItems([])

  const { itemCount, subtotal } = useMemo(() => {
    const itemCount = items.reduce((n, i) => n + i.quantity, 0)
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { itemCount, subtotal }
  }, [items])

  const value: CartState = { items, addItem, removeItem, updateQty, clear, itemCount, subtotal }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
