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
    const fetchPost = async (id) => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "ดึงข้อมูลโพสต์ล้มเหลว",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchPost(id);
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost({
          ...post,
          cover: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
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
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="card bg-white shadow-lg border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">✏️ แก้ไขโพสต์</h1>
          <p className="text-purple-100 text-sm mt-1">อัปเดตเนื้อหาของคุณ</p>
        </div>

        {/* Cover Image */}
        {post?.cover && (
          <figure className="w-full h-72 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
            <img src={post.cover} alt="Preview" className="w-full h-full object-cover" />
          </figure>
        )}

        <form onSubmit={handleSubmit} className="card-body p-8 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">หัวข้อ (Title)</span>
            </label>
            <input
              type="text"
              placeholder="พิมพ์หัวข้อโพสต์..."
              name="title"
              value={post?.title}
              onChange={handleChange}
              className="input input-bordered border-slate-300 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-semibold"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">รูปปก (Cover Image)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered border-slate-300 bg-white file-input-primary focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">เนื้อหา (Content)</span>
            </label>
            <textarea
              placeholder="เนื้อหาโพสต์..."
              name="content"
              value={post?.content}
              onChange={handleChange}
              className="textarea textarea-bordered border-slate-300 h-64 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button type="submit" className="btn btn-success flex-1 font-semibold text-white hover:shadow-lg transition-all">
              💾 บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Edit;
