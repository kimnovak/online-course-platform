import { useState } from 'react';
import { useCart } from '../Cart/useCart';
import { CardPaymentForm } from './CardPayment/CardPayment';
import { HelioPayment } from './HelioPayment/HelioPayment';

export const CheckoutPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('card');
  const { getCartTotal } = useCart();

  const total = getCartTotal();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div>
          <button
            onClick={() => toggleSection('card')}
            className="w-full text-left focus:outline-none"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Pay with Card</h2>
              <span>{openSection === 'card' ? '-' : '+'}</span>
            </div>
          </button>
          {openSection === 'card' && (
            <div className="p-4">
              <CardPaymentForm amount={total} />
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection('custom')}
            className="w-full text-left focus:outline-none"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Helio Payment</h2>
              <span>{openSection === 'custom' ? '-' : '+'}</span>
            </div>
          </button>
          {openSection === 'custom' && (
            <div className="p-4">
              <HelioPayment amount={total} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
