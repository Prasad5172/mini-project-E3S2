import React, { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode; 
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const handleBuyTicket = () => {
    if (!name || !aadhaar) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Booking ticket for:', { name, aadhaar });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold text-black">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-black bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="aadhaar"
              className="block text-sm font-medium text-black"
            >
              Aadhaar
            </label>
            <input
              type="text"
              id="aadhaar"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="mt-1 block  text-black w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center p-4 border-t border-gray-300 justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleBuyTicket}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
