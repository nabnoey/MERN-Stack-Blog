import { useState, useEffect } from "react";
// import { postDetail } from '../data/postDetail'
import postService from "../services/post.service.js";
import Post from "../components/Post.jsx";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Home",
          text: error.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    getAllPosts();
  }, []);

  return (
    <div className="space-y-4">
      {postService.length > 0 &&
        posts.map((post, index) => (
          <Post key={index} postDetail={{ ...post }} />
        ))}
      {posts.length === 0 && <h1>No Pos</h1>}
    </div>
  );
};

export default Home;
