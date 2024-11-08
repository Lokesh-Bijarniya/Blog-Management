import React, { useState } from "react";
import axios from "axios";

export default function CreateBlog() {
  // State to store form values
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState(""); // Feedback message state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !body || !category) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Process the form data here
    const newBlogPost = {
      title,
      body,
      tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma
      category,
      subcategory: subcategory.split(",").map((sub) => sub.trim()), // Split subcategories by comma
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    };

    console.log("Blog post created:", newBlogPost);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8000/blogs/createBlog", newBlogPost,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      ); 

      if(response.status === 201) {
      setMessage("Blog post created successfully!");
      } else {
        setMessage("Failed to create blog post. Please try again.");
      }

      // Clear the form after submission
      setTitle("");
      setBody("");
      setTags("");
      setCategory("");
      setSubcategory("");
      setIsPublished(false);

    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage("There was an error creating the blog post. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Create New Blog Post</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            maxLength={100} // Limit title length
            required
          />
          <p className="text-gray-400 text-sm">{`${title.length}/100`}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white h-40"
            required
            maxLength={2000} // Limit body length
          />
          <p className="text-gray-400 text-sm">{`${body.length}/2000`}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Subcategory (comma-separated)</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-400">Publish Now</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
}
