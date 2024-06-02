import { createFileRoute } from '@tanstack/react-router'
import { CheckoutPage } from '../Checkout/Checkout'

export const Route = createFileRoute('/checkout')({
  component: () => <CheckoutPage />
})