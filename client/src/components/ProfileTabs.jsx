import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import Post from "./Post"; 
import { useAuth } from '../context/AuthContext';

const tabs = [{ label: "My Blogs", value: "1", content: "Profile Content" }];

export default function ProfileTabs() {
  const {user} = useAuth();
  const [value, setValue] = React.useState("1");
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);


  // console.log(user._id);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const authorId = user._id; // Replace this with actual logged-in user ID logic
        const response = await axios.get(`http://localhost:8000/blogs/getBlog/${authorId}`);
        console.log("API Response:", response.data.data); // Check the response structure
        setPosts(response.data.data || []); // Ensure posts is set to an array
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="User's Blogs">
            {tabs.map((data, index) => (
              <Tab key={index} label={data.label} value={data.value} />
            ))}
          </TabList>
        </Box>
        <TabPanel value="1">
          {posts.length === 0 ? (
            <div>No blogs found</div>
          ) : (
            posts.map((post) => (
              <Post key={post._id} post={post} /> 
            ))
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
