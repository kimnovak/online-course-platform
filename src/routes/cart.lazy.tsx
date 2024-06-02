import { createFileRoute } from '@tanstack/react-router'
import { CartPreview } from '../CartPreview/CartPreview'

export const Route = createFileRoute('/cart')({
  component: () => <CartPreview />
})