import React, {useState} from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ShareIcon from '@mui/icons-material/Share';

export default function Post({ post }) {
  const [likes, setLikes] = useState(0);
  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };


  return (
    <div className="bg-gray-900  mb-4 ">
    <div className="bg-gray-700 rounded-t-lg p-4 flex items-start space-x-4">
      {/* Profile Picture */}
      <img
        src={"https://cdn-icons-png.flaticon.com/128/149/149071.png"} // Default placeholder image
        alt={`${post.author}'s profile`}
        className="w-12 h-12 rounded-full"
      />
      
      {/* Post Content */}
      <div>
        {/* Author Information */}
        <div className="text-sm text-gray-400">
          {/* <span className="font-semibold text-blue-500 mr-2">{post.author}</span> */}
          <span className="text-gray-300">{post.authorId.fname} {post.authorId.lname}</span>
          <button className="ml-2 text-blue-400">Follow</button>
        </div>

        {/* Post Content */}
        <p className="text-lg font-semibold text-white mt-2">{post.body}</p>
        
        {/* Tags */}
        <div className="mt-2 flex space-x-2 text-gray-400">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-sm border border-blue-500 px-1 rounded-full">#{tag}</span>
          ))}

</div>
        
      </div>
    </div>

     {/* Interaction Buttons */}
     <div className="p-2 pl-20 w-full flex rounded-b-lg  gap-16 bg-gray-800">
          <button
            onClick={handleLike}
            className={`text-gray-400 flex items-center space-x-1 hover:text-blue-500 transition $`}
          >
            
            <FavoriteBorderIcon fontSize="small" />
            <span className="ml-1 text-gray-400">{likes}</span>
          </button>


          {/* <button 
          onClick={handleLike} 
          className={`mt-2 p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-gray-600'}`}
        >
          ❤️
        </button> */}

          <button className="text-gray-400 flex items-center space-x-1 hover:text-blue-500 transition">
            <InsertCommentIcon fontSize="small" />
          </button>

          <button className="text-gray-400 flex items-center space-x-1 hover:text-blue-500 transition">
            <ShareIcon fontSize="small" />
          </button>
        </div>
    </div>
  );
}
