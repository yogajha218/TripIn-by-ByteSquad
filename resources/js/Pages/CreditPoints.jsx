import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Coins from '/Coins.svg';

const CreditPoints = () => {
  const [totalPoints] = useState(100);
  const [transactions] = useState([
    { id: 1, date: '10 Nov 2024', title: 'Shuttle TripIn', points: -70 },
    { id: 2, date: '10 Nov 2024', title: 'Shuttle TripIn', points: 70 },
    { id: 3, date: '10 Nov 2024', title: 'Shuttle TripIn', points: 70 },
    { id: 4, date: '10 Nov 2024', title: 'Shuttle TripIn', points: 70 },
    { id: 5, date: '10 Nov 2024', title: 'Shuttle TripIn', points: 70 },
    { id: 6, date: '10 Nov 2024', title: 'Shuttle TripIn', points: 70 },
  ]);

  return (
    <div className="min-h-screen min-w-screen bg-primary flex flex-col">
      {/* Credit Points Card */}
      <div className="w-full px-6 pb-8">
        <div className="pt-4">
          <ChevronLeft className="text-white" size={24} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-3 h-20">
            <img src={Coins} alt="coins" className="h-14" />
          </div>
          <span className="text-white text-sm mb-1">CreditsPoint</span>
          <span className="text-white text-3xl font-semibold">{totalPoints}</span>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white flex-1 rounded-t-3xl -mt-4 w-full">
        <div className="px-6 pt-6 pb-20">
          <h2 className="text-lg text-black font-semibold mb-4">History</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <p className="font-medium text-black">{transaction.title}</p>
                </div>
                <span
                  className={`font-semibold ${
                    transaction.points > 0 ? 'text-primary' : 'text-red-500'
                  }`}
                >
                  {transaction.points > 0 ? '+' : ''}
                  {transaction.points} Point
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPoints;