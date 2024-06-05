import { HelioCheckout } from '@heliofi/checkout-react';

type HelioPaymentProps = {
  amount: number;
};

const helioConfig = {
  paylinkId: '665e8cf202e1f0586ae135fc',
  amount: '5.99',
  network: 'test',
  display: 'button',
  onSuccess: event => console.log(event),
  onError: event => console.log(event),
  onPending: event => console.log(event),
  onCancel: () => console.log('Cancelled payment'),
  onStartPayment: () => console.log('Starting payment'),
} as const;

export const HelioPayment = ({ amount }: HelioPaymentProps) => {
  return (
    <label className="block mb-2">
      <HelioCheckout config={{ ...helioConfig, amount: `${amount}` }} />
    </label>
  );
};
