'use client'
import React, { useState, useEffect, useRef, FC } from 'react';
import "./ticket.css";

interface Ticket {
  trainName: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  availability: string;
}

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle menu visibility
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Option handlers (replace these with your actual functionality)
  const handleSendToSale = () => {
    alert(`Ticket "${ticket.trainName}" sent to sale.`);
    setMenuOpen(false);
  };

  const handleCancel = () => {
    alert(`Ticket "${ticket.trainName}" cancelled.`);
    setMenuOpen(false);
  };

  const handleRemove = () => {
    alert(`Ticket "${ticket.trainName}" removed.`);
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ticket-item">
      <div className="ticket-header">
        <h3 className="ticket-train">{ticket.trainName}</h3>
        <div className="menu-container" ref={menuRef}>
          <button className="menu-button" onClick={handleMenuToggle}>
            ⋮
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button className="menu-item" onClick={handleSendToSale}>
                To Sale
              </button>
              <button className="menu-item" onClick={handleCancel}>
                Cancel
              </button>
              <button className="menu-item" onClick={handleRemove}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ticket-info">
        <p>
          <strong>Route:</strong> {ticket.from} to {ticket.to}
        </p>
        <p>
          <strong>Departure:</strong> {ticket.departure}
        </p>
        <p>
          <strong>Arrival:</strong> {ticket.arrival}
        </p>
        <p>
          <strong>Status:</strong> {ticket.availability}
        </p>
      </div>
    </div>
  );
};

const Ticket: FC = () => {
  const ticketData: Ticket[] = [
    {
      trainName: "Express 101",
      from: "Noida",
      to: "Bengaluru",
      departure: "10:00 AM",
      arrival: "2:00 PM",
      availability: "Available",
    },
    {
      trainName: "Express 102",
      from: "Kolkata",
      to: "Delhi",
      departure: "11:00 AM",
      arrival: "3:00 PM",
      availability: "Waiting List",
    },
    {
      trainName: "Express 102",
      from: "Kolkata",
      to: "Delhi",
      departure: "11:00 AM",
      arrival: "3:00 PM",
      availability: "Waiting List",
    },
  ];

  return (
    <div className="ticket-container">
      <div className="ticket-card w-full h-screen">
        <h2 className="ticket-heading">Your Tickets</h2>
        <div className='flex flex-wrap justify-evenly'>
          {ticketData.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
