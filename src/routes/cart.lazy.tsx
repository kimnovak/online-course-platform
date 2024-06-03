import { createFileRoute } from '@tanstack/react-router'
import { Cart } from '../Cart/Cart'

export const Route = createFileRoute('/cart')({
  component: () => <Cart />
})