import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppwriteService from '../appwrite/config'
import { Container } from '../components'
import { Query } from 'appwrite'


function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const auth = useSelector((state) => state.auth.userData)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await AppwriteService.getTransactions([
          Query.equal('userid', auth?.$id),
          Query.orderDesc('$createdAt'),
        ])

        if (res?.documents) {
          setTransactions(res.documents)
        }
      } catch (err) {
        console.error('Error fetching transactions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [auth?.$id])

  return (
    <Container>
      <div className='max-w-4xl mx-auto py-10'>
        <h1 className='text-3xl font-bold text-center mb-8'>Transaction History</h1>

        {loading ? (
          <p className='text-center'>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className='text-center text-gray-600'>No transactions found.</p>
        ) : (
          <div className='overflow-x-auto shadow rounded-lg'>
            <table className='w-full table-auto text-left border'>
              <thead className='bg-gray-100 text-gray-700'>
                <tr>
                  <th className='p-3 border-b'>Date</th>
                  <th className='p-3 border-b'>Type</th>
                  <th className='p-3 border-b'>Amount ($)</th>
                  <th className='p-3 border-b'>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.$id} className='hover:bg-gray-50'>
                    <td className='p-3 border-b'>
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className='p-3 border-b'>{tx.type}</td>
                    <td className='p-3 border-b'>${tx.amount}</td>
                    <td className='p-3 border-b'>{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Transactions
