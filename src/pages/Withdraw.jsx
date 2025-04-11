import React, { useState } from 'react';
import appwriteService from '../appwrite/config'; // Import the Appwrite service
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    // Ensure amount is a valid positive integer
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount to withdraw.');
      return;
    }

    setLoading(true);
    try {
      // Convert amount to an integer
      const amountAsInt = parseInt(amount, 10); // Use parseFloat if decimals are allowed

      if (isNaN(amountAsInt)) {
        setMessage('Invalid amount format. Please enter a valid number.');
        return;
      }

      const userid = "USER_iD"; // Replace with actual user ID logic
      const timestamp = new Date().toISOString();
      const status = 'success'; // You can set status based on your business logic
      const type = 'widthraw'; // Type is set to "widthraw" for this transaction

      // Make API call to create the transaction document
      const transaction = await appwriteService.createTransaction({
        amount: amountAsInt, // Send the amount as an integer
        type: 'widthraw', // Type is set to "withdraw"
        status: 'success',
        userid,
        timestamp: new Date().toISOString(),
      });

      if (transaction && transaction.$id) {
        setMessage('Withdrawal successful!');
        setAmount('');
        setTimeout(() => navigate('/transactions'), 2000); // Redirect after success
      } else {
        setMessage('Withdrawal failed. Please try again.');
      }
    } catch (err) {
      // Log the error and show the user a friendly message
      console.error('Error during withdrawal:', err);
      setMessage('An error occurred during withdrawal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 mt-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Withdraw Funds</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700">Amount (${amount})</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleWithdraw}
        disabled={loading}
        className={`w-full py-2 mt-4 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold`}
      >
        {loading ? 'Processing...' : 'Withdraw'}
      </button>
      {message && (
        <p className="mt-4 text-center text-red-500">{message}</p>
      )}
    </div>
  );
}

export default Withdraw;
