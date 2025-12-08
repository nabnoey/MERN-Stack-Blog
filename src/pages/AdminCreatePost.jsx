import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNews } from "../context/NewsContext";

function AdminCreatePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addNews, items } = useNews();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "กรุณากรอกชื่อเรื่อง";
    if (!content.trim()) e.content = "กรุณากรอกเนื้อหา";
    if (image && !/^https?:\/\//i.test(image)) e.image = "ลิงก์รูปภาพต้องเป็น URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      title: title.trim(),
      image: image.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content: content.trim()
    };
    // เพิ่มลง store ฝั่ง client และไปหน้า detail
    addNews(payload);
    const newId = (items.reduce((m, it) => Math.max(m, it.id), 0) || 0) + 1;
    const Swal = window.Swal;
    if (Swal) {
      Swal.fire({ icon: 'success', title: 'บันทึกสำเร็จ', timer: 1200, showConfirmButton: false })
        .then(() => navigate(`/news/${newId}`));
    } else {
      navigate(`/news/${newId}`);
    }
  };

  // Guard: only admin can access
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">สร้างโพสต์ใหม่ (Admin)</h1>
          <button className="btn btn-sm" onClick={() => navigate(-1)}>ย้อนกลับ</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเรื่อง</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="กรอกชื่อบทความ"
              className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            />
            {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ลิงก์รูปภาพ (URL)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className={`input input-bordered w-full ${errors.image ? "input-error" : ""}`}
            />
            {errors.image && <p className="text-error text-xs mt-1">{errors.image}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">แท็ก (คั่นด้วย ,)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="ai, devops, web"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="พิมพ์เนื้อหาที่นี่... รองรับข้อความธรรมดา"
              className={`textarea textarea-bordered w-full ${errors.content ? "textarea-error" : ""}`}
            />
            {errors.content && <p className="text-error text-xs mt-1">{errors.content}</p>}
          </div>

          {image ? (
            <div>
              <p className="text-sm text-gray-600 mb-2">ตัวอย่างรูปภาพ</p>
              <img src={image} alt="preview" className="w-full h-60 object-cover rounded-lg border" />
            </div>
          ) : null}

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn btn-primary">บันทึก (จำลอง)</button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => { setTitle(""); setImage(""); setTags(""); setContent(""); setErrors({}); }}
            >ล้างฟอร์ม</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreatePost;
