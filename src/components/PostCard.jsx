import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
        <div className="w-full mb-4">
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title} 
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
        <h2 className="text-lg font-bold text-center">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
