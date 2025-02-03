'use client'
import React, { useState } from 'react';
import Modal from './Modal';

type Ticket = {
  trainName: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  availability: string;
  date: string;
};

type CardProps = {
  ticket: Ticket;
};

const Card: React.FC<CardProps> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Train Information */}
        <div className="train-info">
          <h2 className="text-2xl font-bold text-gray-800">{ticket.trainName}</h2>
          <p className="text-gray-600">
            {ticket.from} to {ticket.to}
          </p>
          <p className="text-gray-500">Departure: {ticket.departure}</p>
          <p className="text-gray-500">Arrival: {ticket.arrival}</p>
          <p className="text-gray-500">Date: {ticket.date}</p>
          <p
            className={`text-sm font-semibold ${
              ticket.availability === 'Available' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            Status: {ticket.availability}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Remove
          </button>
          <button
            onClick={handleBuyNowClick}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Purchase Ticket">
        <p>Are you sure you want to purchase a ticket for {ticket.trainName}?</p>
        {/* Additional modal content can go here */}
      </Modal>
    </>
  );
};

export default Card;
