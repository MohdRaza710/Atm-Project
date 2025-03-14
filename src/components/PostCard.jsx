import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className='w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300'>
        <div className='w-full flex justify-center mb-4'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className='rounded-xl w-full h-48 object-cover sm:h-64 md:h-72 lg:h-80'
          />
        </div>
        <h2 className='text-lg sm:text-xl font-bold text-center md:text-left'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
