import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type CardPaymentProps = {
  amount: number;
};

interface IFormInputs {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .length(16, 'Card number must be exactly 16 digits'),
  cardName: yup.string().required('Cardholder name is required'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      'Expiry date must be in MM/YY format'
    ),
  cvv: yup
    .string()
    .required('CVV is required')
    .length(3, 'CVV must be exactly 3 digits'),
});

export const CardPaymentForm: React.FC<CardPaymentProps> = ({ amount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
    alert('Payment successful!');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border border-gray-300 rounded-md"
    >
      <div className="mb-4">
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          {...register('cardNumber')}
          maxLength={16}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="cardName"
          className="block text-sm font-medium text-gray-700"
        >
          Cardholder Name
        </label>
        <input
          id="cardName"
          type="text"
          {...register('cardName')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.cardName && (
          <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="expiryDate"
          className="block text-sm font-medium text-gray-700"
        >
          Expiry Date (MM/YY)
        </label>
        <input
          id="expiryDate"
          type="text"
          {...register('expiryDate')}
          maxLength={5}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expiryDate.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="cvv"
          className="block text-sm font-medium text-gray-700"
        >
          CVV
        </label>
        <input
          id="cvv"
          type="text"
          {...register('cvv')}
          maxLength={3}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.cvv && (
          <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Pay Now
      </button>
    </form>
  );
};
