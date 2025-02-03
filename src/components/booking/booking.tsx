'use client'
import React, { useState } from 'react';
import "./booking.css";
import TrainCard from './TrainCard';

interface Stop {
  station: string;
  arrival_time: string;
  date: string;
}

interface Seat {
  type: string;
  available: number;
}

interface ClassData {
  name: string;
  code?: string;
  price?: number;
  seats?: Seat[];
  refreshments?: string;
}

interface TrainData {
  train_id: string | number;
  train_name: string;
  runs_on: string;
  stops: Stop[];
  classes: ClassData[];
  notes?: string;
  journey_distance: number;
  source: string;
  destination: string;
  price_ac: number;
  total_ac: number;
  avail_ac: number;
  price_sl: number;
  total_sl: number;
  avail_sl: number;
  price_gn: number;
  total_gn: number;
  avail_gn: number;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    aadharNumber: "",
    dateOfJourney: "",
  });

  const stations = [
    "visakhapatnam", "vizianagaram", "srikakulam", "vijayawada", "hyderabad"
  ];

  const trainData: TrainData[] = [
    {
      train_id: 1,
      train_name: "SuperFast Express",
      runs_on: "Mon, Wed, Fri",
      stops: [
        { station: "New York", arrival_time: "10:00 AM", date: "2025-02-04" },
        { station: "Chicago", arrival_time: "2:00 PM", date: "2025-02-04" }
      ],
      classes: [
        {
          name: "AC",
          price: 150,
          seats: [{ type: "AC Tier 1", available: 50 }]
        },
        {
          name: "Sleeper",
          price: 75,
          seats: [{ type: "Sleeper", available: 150 }]
        },
        {
          name: "General",
          price: 75,
          seats: [{ type: "General", available: 150 }]
        }
      ],
      journey_distance: 450,
      source: "New York",
      destination: "Chicago",
      price_ac: 150,
      total_ac: 100,
      avail_ac: 50,
      price_sl: 75,
      total_sl: 200,
      avail_sl: 150,
      price_gn: 50,
      total_gn: 300,
      avail_gn: 250
    },
    // Add more train objects similarly...
  ];

  const handleSearch = () => {
    // Your search logic here
  };

  // Dummy handleBuyTicket function
  const handleBuyTicket = (seat: Seat) => {
    alert(`Buying ticket for ${seat.type} at ₹${seat.available}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Train Ticket Booking</h2>
        {/* Booking Form */}
        <section className="search-section">
          <h1>Book Your Train Tickets</h1>
          <form id="search-form">
            <select
              name="source"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="p-2 border rounded-md mb-4 bg-white text-black"
            >
              <option value="">Select Source Station</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>{station}</option>
              ))}
            </select>
            <select
              name="destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="p-2 border rounded-md mb-4 bg-white text-black"
            >
              <option value="">Select Destination Station</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>{station}</option>
              ))}
            </select>
            <input
              type="date"
              name="dateOfJourney"
              value={formData.dateOfJourney}
              onChange={(e) => setFormData({ ...formData, dateOfJourney: e.target.value })}
              className="p-2 border rounded-md mb-4"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Search Trains
            </button>
          </form>
        </section>

        {/* Render Train Cards */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Trains</h3>
          <div className="space-y-4 flex justify-around flex-wrap">
            {trainData.map((train, index) => (
              <TrainCard
                key={`${train.train_id}-${index}`}
                trainData={train}
                handleBuyTicket={handleBuyTicket}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
