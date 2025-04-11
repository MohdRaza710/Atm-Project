import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppwriteService from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Container } from '../components'
import { Query } from 'appwrite'

function Home() {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const auth = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const transactions = await AppwriteService.getTransactions([
          Query.equal("userid", auth?.$id),
        ])

        const total = transactions?.documents?.reduce((acc, tx) => {
          if (tx.type === 'deposit') return acc + Number(tx.amount)
          if (tx.type === 'widthraw') return acc - Number(tx.amount)
          return acc
        }, 0)

        setBalance(total || 0)
      } catch (err) {
        console.error('Error loading balance:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [auth?.$id])

  const actionCards = [
    {
      title: 'Deposit Money',
      description: 'Add funds to your account',
      button: 'Deposit',
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/deposit',
    },
    {
      title: 'Withdraw Money',
      description: 'Take cash from your account',
      button: 'Withdraw',
      color: 'bg-red-500 hover:bg-red-600',
      path: '/withdraw',
    },
    {
      title: 'Transaction History',
      description: 'View all your transactions',
      button: 'View',
      color: 'bg-gray-700 hover:bg-gray-800',
      path: '/transactions',
    },
  ]
  
  return (
    <Container>
      <div className='max-w-4xl mx-auto py-10'>
        <h1 className='text-3xl font-bold text-center mb-8'>Welcome to Your ATM</h1>
        
        <div className='bg-green-100 text-green-800 font-semibold rounded-lg text-center p-4 mb-8 shadow'>
          {loading ? 'Loading balance...' : `Current Balance: $${balance.toFixed(2)}`}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {actionCards.map((card) => (
            <div
              key={card.title}
              className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'
            >
              <h2 className='text-xl font-semibold mb-2'>{card.title}</h2>
              <p className='text-gray-600 mb-4'>{card.description}</p>
              <button
                onClick={() => navigate(card.path)}
                className={`text-white px-4 py-2 rounded ${card.color} transition`}
              >
                {card.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Home
