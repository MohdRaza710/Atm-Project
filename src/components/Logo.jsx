import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex justify-center md:justify-start">
      <img 
        className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" 
        src="https://i.ibb.co/1YYjJjht/download-removebg-preview.png"
        alt="ATM Logo" 
      />
    </div>
  )
}

export default Logo
