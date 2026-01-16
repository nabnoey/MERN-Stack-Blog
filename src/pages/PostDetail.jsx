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

  const handleDelete = async (postId) => {
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
        const response = await PostService.deletePost(postId);
        if (response.status === 200) {
          await Swal.fire({
            title: "ลบสำเร็จ",
            icon: "success",
            text: "ลบโพสต์เรียบร้อยแล้ว",
          });
          window.location.href = "/";
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
    <div className="card lg:card-side bg-base-100 shadow-sm">
      <figure>
        <img src={post.cover} alt={post.title} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post?.createAt}</p>
        {/* <p>{post?.author?.username}</p>
        By: {post.author} */}
        <span className="">
          @{post?.author?.username}
          <a href={`/author/${post?.author?._id}`}>{post?.author?.username}</a>
        </span>
        <div
          className="content text-grey-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></div>
        {userInfo?._id === post?.author?._id && (
          <div className="flex gap-2">
            <a className="btn btn-warning" href={`/edit/${id}`}>
              Edit
            </a>
            <button className="btn btn-error" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
