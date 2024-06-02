import { useState } from 'react';
import { HelioCheckout } from '@heliofi/checkout-react';

const helioConfig = {
  paylinkId: '6571e7cd4a2bee8095ee84da',
  amount: '5.99',
};

export const CheckoutPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

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
              <label className="block mb-2">
                <span className="text-gray-700">Card Number</span>
                <input
                  type="text"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Expiry Date</span>
                <input
                  type="text"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">CVC</span>
                <input
                  type="text"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
              </label>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection('paypal')}
            className="w-full text-left focus:outline-none"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Pay with PayPal</h2>
              <span>{openSection === 'paypal' ? '-' : '+'}</span>
            </div>
          </button>
          {openSection === 'paypal' && (
            <div className="p-4">
              <p className="text-gray-700">
                You will be redirected to PayPal to complete the payment.
              </p>
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
              <label className="block mb-2">
                <span className="text-gray-700">Pay with Crypto via Helio</span>
                <HelioCheckout config={helioConfig} />
              </label>
            </div>
          )}
        </div>
      </div>
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Complete Purchase
      </button>
    </div>
  );
};
