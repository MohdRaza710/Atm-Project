import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import atmService from '../appwrite/config'

function Deposit() {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const auth = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const handleDeposit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const numAmount = parseFloat(amount)

    // Validate input amount
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setMessage('Please enter a valid deposit amount')
      setLoading(false)
      return
    }

    try {
      // Debugging - Log the user and transaction data
      console.log('User ID:', auth.$id)
      console.log('Deposit Amount:', numAmount)

      // Create transaction using appwrite service
      const transaction = await atmService.createTransaction({
        amount: numAmount,
        type: 'deposit',
        status: 'success',
        userId: auth.$id,
        timestamp: new Date().toISOString(),
      })

      // Debugging - Check the response from Appwrite
      console.log('Transaction Response:', transaction)

      // If the transaction object is empty or undefined, log the error
      if (!transaction || !transaction.$id) {
        throw new Error('Transaction creation failed, no ID returned.')
      }

      setMessage('Deposit successful!')
      setAmount('')
      setTimeout(() => navigate('/transactions'), 2000)
    } catch (err) {
      // Catch and log any errors that happen during the transaction process
      console.error('Error during deposit:', err)
      setMessage('An error occurred during deposit.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Deposit Money</h2>
      
      <form onSubmit={handleDeposit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-gray-700 text-lg mb-2">Deposit Amount (₹)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Processing...' : 'Deposit'}
        </button>
      </form>

      {message && <p className={`mt-4 text-center text-lg ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
    </div>
  )
}

export default Deposit
