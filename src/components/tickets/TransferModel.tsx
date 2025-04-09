import React, { useState } from 'react';
import toast from 'react-hot-toast';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

const TransferModel: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [friendAadhaar, setFriendAadhaar] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate inputs
    if (!tokenId || !walletAddress || !friendAadhaar) {
      toast.error('All fields are required.');
      onClose();
      return;
    }

    // Example of how to handle the submission, for now just logging
    console.log('Ticket transferred:', { tokenId, walletAddress, friendAadhaar });

    // Clear fields after submit (optional)
    setTokenId('');
    setWalletAddress('');
    setFriendAadhaar('');
    onClose();
    toast.success("hi");
  };

  if (!isOpen) return null;

  return (
    <>
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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {/* First row: Token ID and Wallet Address */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">Token ID:</label>
                    <input
                      type="text"
                      id="tokenId"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">User Wallet Address:</label>
                    <input
                      type="text"
                      id="walletAddress"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Second row: Friend's Aadhaar Number */}
                <div>
                  <label htmlFor="friendAadhaar" className="block text-sm font-medium text-gray-700">Friends Aadhaar Number:</label>
                  <input
                    type="text"
                    id="friendAadhaar"
                    value={friendAadhaar}
                    onChange={(e) => setFriendAadhaar(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Transfer Ticket
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default TransferModel;
