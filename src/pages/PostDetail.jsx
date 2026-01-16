import { useState, useEffect, useContext } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import { UserContext } from "../context/UserContext";


const PostDetail = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState({
    _id: "",
    title: "",
    cover: "",
    createAt: "",
    author: {},
    content: "",
  });
 

  //ถ้าไอดีเปลี่ยนให้เปลี่ยนตาม
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "ต้องการลบโพสต์นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const response = await PostService.deletePost(id);
        if (response.status === 200) {
          await Swal.fire({
            title: "ลบสำเร็จ",
            icon: "success",
            text: "ลบโพสต์เรียบร้อยแล้ว",
          });
       
        }
      } catch (error) {
        Swal.fire({
          title: "ลบล้มเหลว",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card bg-white shadow-lg border border-blue-100 overflow-hidden">
        {/* Cover Image */}
        <figure className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100">
          <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
        </figure>

        <div className="card-body p-8 space-y-6">
          {/* Title */}
          <div className="border-b-2 border-slate-100 pb-4">
            <h2 className="card-title text-4xl font-bold text-slate-800 mb-2">{post.title}</h2>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">
                📅 {post?.createAt}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-blue-600">By</span>
                <a href={`/author/${post?.author?._id}`} className="badge badge-primary badge-outline font-semibold hover:shadow-md transition-all">
                  @{post?.author?.username}
                </a>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div
            className="prose prose-sm md:prose-base max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          ></div>
          
          {/* Action Buttons */}
          {userInfo?._id === post?.author?._id || userInfo?.id === post?.author?._id ? (
            <div className="flex gap-3 pt-6 border-t-2 border-slate-100">
              <a className="btn btn-warning btn-outline gap-2 font-semibold" href={`/edit/${id}`}>
                ✏️ แก้ไข
              </a>
              <button className="btn btn-error btn-outline gap-2 font-semibold" onClick={() => handleDelete(post._id)}>
                🗑️ ลบ
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
