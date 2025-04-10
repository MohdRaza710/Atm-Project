import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Pages
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Transactions from './pages/Transactions.jsx'
import Withdraw from './pages/Withdraw.jsx'
import Deposit from './pages/Deposit.jsx'

// Components
import { AuthLayout, Login } from './components'

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/transactions",
        element: (
          <AuthLayout authentication={true}>
            <Transactions />
          </AuthLayout>
        ),
      },
      {
        path: "/withdraw",
        element: (
          <AuthLayout authentication={true}>
            <Withdraw />
          </AuthLayout>
        ),
      },
      {
        path: "/deposit",
        element: (
          <AuthLayout authentication={true}>
            <Deposit />
          </AuthLayout>
        ),
      },
    ],
  },
]);

// Render App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
