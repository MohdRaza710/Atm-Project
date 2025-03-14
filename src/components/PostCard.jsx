import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block w-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[400px] mx-auto mb-4">
        
        <div className="w-full h-48 sm:h-60">
          <img
            className="w-full h-full object-cover"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>

        <div className="p-4 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
