import { useState } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [sumary, setSumary] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!title || !sumary || !content) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    const newPost = {
      title,
      sumary,
      content,
      author: "Guest", // ยังไม่ต้องมีระบบ user
      date: new Date().toISOString(),
    };

    await fetch("http://localhost:3000/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    Swal.fire({
      icon: "success",
      title: "โพสต์ถูกบันทึกแล้ว!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => navigate("/"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create New Post</h2>

          <input
            type="text"
            className="input input-bordered mt-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            className="input input-bordered mt-4"
            placeholder="Summary"
            value={sumary}
            onChange={(e) => setSumary(e.target.value)}
          />

          <p className="mt-4 font-semibold">Content</p>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
              "image",
            ]}
            style={{ height: "300px", marginBottom: "2rem" }}
          />

          <input type="file" className="file-input file-input-bordered mt-4" />

          <button
            onClick={handleCreatePost}
            className="btn btn-primary w-full mt-6"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
