import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: {
    id: string
    name: string
    price?: number
  }
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(
          (i) => i.productId === item.productId && i.variant?.id === item.variant?.id
        )
        
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          })
        } else {
          const newItem = { ...item, id: `${item.productId}-${item.variant?.id || 'default'}-${Date.now()}` }
          set({ items: [...items, newItem] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.id !== id) })
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.variant?.price || item.price
          return total + itemPrice * item.quantity
        }, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'shopify-cart',
    }
  )
)

// Wishlist Store
export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'id'>) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const exists = get().items.some((i) => i.productId === item.productId)
        if (!exists) {
          set({ items: [...get().items, { ...item, id: item.productId }] })
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) })
      },
      
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },
    }),
    {
      name: 'shopify-wishlist',
    }
  )
)
