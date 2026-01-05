import {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

const Edit = forwardRef(({ value, onChange }, ref) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];
  useImperativeHandle(ref, () => {
    getQuil: () => {
      return quillRef.current.getEditor();
    };
  });
  //modules
  const modules = {
    toolbar: toolbarOptions,
  };

  const [post, setPost] = useState({
    title: "",
    cover: "",
    createAt: "",
    author: {},
    content: "",
  });

  useEffect(() => {
    const updatePosts = async (id) => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Posts",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updatePosts(id);
  }, [id]);
  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const newPosts = await PostService.updatePost(id, post);
      if (newPosts.status === 201 || newPosts.status === 200) {
        await Swal.fire({
          title: "Update Post",
          icon: "success",
          text: "Update Successfully!",
        });
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Update Post",
        icon: "error",
        text: error.message || "Request failed",
      });
      console.error("Update post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-yellow-50 py-10">
      <div className="w-full max-w-2xl text-purple-800 bg-white rounded-2xl shadow-xl p-8 ring-2 ring-purple-300">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 drop-shadow-sm">
          Update Book
        </h1>

        <form onSubmit={handleChange} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={post?.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Cover URL"
            value={post?.cover}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Content"
            value={post?.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={6}
          />

          <button type="submit" className="btn btn-primary w-full">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
});

export default Edit;
