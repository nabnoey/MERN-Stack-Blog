import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import PostService from "../services/post.service";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const navigate = useNavigate();
  const editorRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setPostDetail({ ...postDetail, file: files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setPostDetail({ ...postDetail, content: value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      data.append("file", postDetail.file);

      const response = await PostService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Create post successfully",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post Failed",
        icon: "error",
        text: error.message || "Request failed",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create New Post</h2>

          <input
            type="text"
            name="title"
            className="input input-bordered mt-4"
            placeholder="Title"
            value={postDetail.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="summary"
            className="input input-bordered mt-4"
            placeholder="Summary"
            value={postDetail.summary}
            onChange={handleChange}
          />

          <p className="mt-4 font-semibold">Content</p>

          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={postDetail.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            style={{ height: "300px", marginBottom: "2rem" }}
          />

          <input
            type="file"
            name="file"
            className="file-input file-input-bordered mt-4"
            onChange={handleChange}
          />

          <button
            className="btn btn-primary w-full mt-6"
            onClick={handleSubmit}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
