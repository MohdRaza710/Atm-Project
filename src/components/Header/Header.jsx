import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiMenu, FiX } from 'react-icons/fi'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Transactions',
      slug: '/transactions',
      active: authStatus,
    },
    {
      name: 'Withdraw',
      slug: '/withdraw',
      active: authStatus,
    },
    {
      name: 'Deposit',
      slug: '/deposit',
      active: authStatus,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-white z-50 relative'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className='md:hidden text-2xl'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Nav Items */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex ml-auto md:space-x-4 p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
              menuOpen ? 'block' : 'hidden'
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='text-center md:text-left'>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setMenuOpen(false)
                    }}
                    className='block md:inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full w-full md:w-auto'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='text-center md:text-left'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
