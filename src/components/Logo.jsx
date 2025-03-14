import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex justify-center md:justify-start">
      <img 
        className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32" 
        src="https://www.logoai.com/uploads/output/2022/01/16/2fcac87be864706bdc67c7eafe94b87e.jpg?t=1642342896" 
        alt="megaBlog" 
      />
    </div>
  )
}

export default Logo
