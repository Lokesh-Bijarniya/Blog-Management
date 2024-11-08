import React from "react";

const trendingBlogs = [
  { id: 1, name: "oozins", description: "Oozins Blog" },
  { id: 2, name: "kpop---scenarios", description: "Kpop Scenarios" },
  { id: 3, name: "vintagewildlife", description: "All these animals..." },
  { id: 4, name: "neilsanders", description: "NEIL SANDERS" },
];

export default function TrendingBlogs() {
  return (
    <div className="hidden h-screen sticky top-0   md:block  bg-gray-800 p-4">
      <h2 className="text-xl font-semibold mb-4">Trending Blogs</h2>
      {trendingBlogs.map((blog) => (
        <div key={blog.id} className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
          <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="blog" className="h-9 w-9"/>
          <div>
            <p className="font-bold">{blog.name}</p>
            <p className="text-sm text-gray-400">{blog.description}</p>
          </div>
          </div>
          <button className="text-blue-500">Follow</button>
        </div>
      ))}
      <p className="text-blue-500 mt-4 cursor-pointer">Show more blogs</p>
    </div>
  );
}
