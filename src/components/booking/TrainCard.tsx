import React, { useState } from 'react';
import Modal from './Modal'; // Ensure the correct path to your Modal component

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
}

interface TrainCardProps {
  trainData: TrainData;
  handleBuyTicket: (seat: Seat, name: string, aadhaar: string) => void;
}

const TrainCard: React.FC<TrainCardProps> = ({ trainData, handleBuyTicket }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const handleClassClick = (cls: ClassData) => {
    setSelectedClass(selectedClass === cls.name ? null : cls.name);
  };

  const getPriceForClass = (className: string): number => {
    const selected = trainData.classes.find((cls) => cls.name === className);
    return selected?.price || 0;
  };

  const selectedClassData = trainData.classes.find(
    (cls) => cls.name === selectedClass
  );

  const onPayClick = (seat: Seat) => {
    setSelectedSeat(seat);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSeat(null);
  };

  const handleModalSubmit = (name: string, aadhaar: string) => {
    if (selectedSeat) {
      handleBuyTicket(selectedSeat, name, aadhaar);
      handleModalClose();
    }
  };

  return (
    <div className="flex border border-gray-300 rounded-lg p-6 shadow-lg">
      <div className="w-2/3">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {trainData.train_name} ({trainData.train_id})
        </h2>
        <p className="text-gray-600">Runs On: {trainData.runs_on}</p>
        <div className="mb-4">
          {trainData.stops.map((stop, index) => (
            <div key={index} className="flex justify-between">
              <p>{stop.station}</p>
              <p>
                {stop.arrival_time} ({stop.date})
              </p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {trainData.classes.map((cls, index) => (
            <button
              key={index}
              onClick={() => handleClassClick(cls)}
              className={`px-4 py-2 border rounded-md transition-colors duration-200 ${selectedClass === cls.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
                }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
        {trainData.notes && (
          <p className="text-gray-600 mt-4">{trainData.notes}</p>
        )}
      </div>

      {selectedClass && selectedClassData && (
        <div className="w-1/3 flex flex-col items-start justify-start border-l pl-6">
          <div className="w-full mb-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedClassData.name}
            </h3>
            {selectedClassData.seats && selectedClassData.seats.length > 0 ? (
              selectedClassData.seats.map((seat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-3 mb-3 border-b border-gray-200"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{seat.type}</p>
                    <p className="text-sm text-gray-500">{seat.available} available</p>
                  </div>
                  <button
                    onClick={() => onPayClick(seat)}
                    className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Pay {getPriceForClass(selectedClass)}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No seat details available</p>
            )}
          </div>
        </div>

      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Book Ticket"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="aadhaar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Aadhaar
            </label>
            <input
              type="text"
              id="aadhaar"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center p-4 border-t dark:border-gray-600 border-gray-200 justify-end">
            <button
              onClick={handleModalClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const nameInput = document.getElementById(
                  'name'
                ) as HTMLInputElement;
                const aadhaarInput = document.getElementById(
                  'aadhaar'
                ) as HTMLInputElement;
                handleModalSubmit(nameInput.value, aadhaarInput.value);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Buy Ticket
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TrainCard;
