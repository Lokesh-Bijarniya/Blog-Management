import React from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the import based on your file structure
import defaultProfileImage from "../assets/defaultProfileImage.jpeg";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  const { user } = useAuth(); // Retrieve user from Auth context
//   console.log(user.fname);

  if (!user) {
    return (
      <div className="mt-4 p-4 bg-gray-700 rounded">
        <h3 className="text-xl font-bold">Profile Information</h3>
        <p>You are not logged in. Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Header Image */}
      <div className="flex gap-6">
        <div className="relative w-56">
          <img
            src={user.profileImage || defaultProfileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        <div className="px-4">
          <h2 className="text-2xl font-bold flex gap-2">
            <h2>
            {user.fname}</h2>
            <h2>
            {user.lname}</h2>
            
          </h2>
          {/* <p className="text-gray-400">@{user.username}</p> */}
          <p className="mt-2">
            {user.bio ||
              "Sharing insights, stories, and inspiration on topics like tech, lifestyle, or personal growth. Follow me in exploring ideas that inform, entertain, and empower!."}
          </p>
          <div className="mt-4">
            {user.location && (
              <p className="text-gray-400">Location: {user.location}</p>
            )}
            {user.website && (
              <a
                href={user.website}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website: {user.website}
              </a>
            )}
          </div>

          {/* Follow Button */}
          <div className="mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around mt-4 border-t border-gray-700 py-2">
        <div className="text-center">
          <h4 className="text-lg font-bold">{user.followingCount || 0}</h4>
          <p className="text-gray-400">Following</p>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-bold">{user.followersCount || 0}</h4>
          <p className="text-gray-400">Followers</p>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-bold">{user.blogsCount || 0}</h4>
          <p className="text-gray-400">Blogs</p>
        </div>
      </div>
     

     <hr/>


     <ProfileTabs/>
    </div>
  );
};

export default Profile;
