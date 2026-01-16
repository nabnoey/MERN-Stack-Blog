import { useState, useContext } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import PostService from "../services/post.service";
import { UserContext } from "../context/UserContext";

const Create = () => {
  const { userInfo } = useContext(UserContext);
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const navigate = useNavigate();

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
      if (!userInfo) {
        Swal.fire({
          title: "Not Logged In",
          text: "Please log in to create a post",
          icon: "warning",
        });
        return;
      }

      const data = new FormData();
      data.append("title", postDetail.title);
      data.append("summary", postDetail.summary);
      data.append("content", postDetail.content);
      data.append("file", postDetail.file);
      data.append("authorId", userInfo._id || userInfo.id);

      const response = await PostService.createPost(data);

      if (response.status === 200 || response.status === 201) {
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
        text: error.response?.data?.message || error.message || "Request failed",
      });
      console.error(error);
    }
  };

  return (
    <div className="w-full py-8">
      <div className="card w-full bg-white shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <h2 className="text-3xl font-bold text-white">✍️ สร้างโพสต์ใหม่</h2>
          <p className="text-blue-100 text-sm mt-1">แชร์ความคิดและประสบการณ์ของคุณ</p>
        </div>
        <div className="card-body p-8 space-y-6">
          <input
            type="text"
            name="title"
            className="input input-bordered text-white  border-slate-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
            placeholder="พิมพ์หัวข้อโพสต์..."
            value={postDetail.title}
            onChange={handleChange}
          />

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">บทสรุป (Summary)</span>
            </label>
            <textarea
              name="summary"
              className="textarea textarea-bordered text-white border-slate-300 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="บรรยายสั้น ๆ เกี่ยวกับโพสต์ของคุณ..."
              value={postDetail.summary}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">เนื้อหา (Content)</span>
            </label>
            <div className="bg-slate-50 rounded-lg border-2 border-dashed border-blue-300 p-4 hover:border-blue-500 transition-colors">
              <ReactQuill
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
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-slate-700">รูปปก (Cover Image)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              name="file"
              className="file-input file-input-bordered border-slate-300 bg-white file-input-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button className="btn btn-success flex-1 font-semibold text-white hover:shadow-lg transition-all" onClick={handleSubmit}>
              📤 เผยแพร่โพสต์
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
