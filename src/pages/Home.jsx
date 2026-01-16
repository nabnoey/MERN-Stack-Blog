import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { postDetail } from '../data/postDetail'
import postService from "../services/post.service.js";
import Post from "../components/Post.jsx";
import Swal from "sweetalert2";
// import db from "../db.json";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await postService.getAllPost();
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
    getAllPost();
  }, []);

  return (
    <div className="w-full">
      {posts.length > 0 ? (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">บทความทั้งหมด</h1>
            <p className="text-slate-600">📚 มีทั้งหมด {posts.length} บทความ</p>
          </div>
          {posts.map((post, index) => (
            <Post key={index} postDetail={{ ...post }} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">ยังไม่มีบทความ</h2>
          <p className="text-slate-600 mb-6">เริ่มเขียนบทความแรกของคุณ</p>
          <Link to="/create" className="btn btn-primary gap-2">✍️ สร้างบทความใหม่</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
