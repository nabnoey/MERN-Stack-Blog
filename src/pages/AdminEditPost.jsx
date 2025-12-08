import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNews } from "../context/NewsContext";

function AdminEditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const { items, updateNews, deleteNews } = useNews();
  const newsId = Number(id);
  const current = items.find((n) => n.id === newsId);

  const [title, setTitle] = useState(current?.title || "");
  const [image, setImage] = useState(current?.image || "");
  const [tags, setTags] = useState((current?.tags || []).join(", "));
  const [content, setContent] = useState(current?.content || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [user, navigate, location]);

  useEffect(() => {
    if (!current) return;
    setTitle(current.title || "");
    setImage(current.image || "");
    setTags((current.tags || []).join(", "));
    setContent(current.content || "");
  }, [current]);

  if (!current) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-700">ไม่พบข่าวที่ต้องการแก้ไข</p>
          <button className="btn mt-4" onClick={() => navigate("/news")}>กลับหน้า ข่าวทั้งหมด</button>
        </div>
      </div>
    );
  }

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
    updateNews(newsId, payload);
    const Swal = window.Swal;
    if (Swal) {
      Swal.fire({ icon: 'success', title: 'บันทึกการแก้ไขแล้ว', timer: 1200, showConfirmButton: false })
        .then(() => navigate(`/news/${newsId}`));
    } else {
      navigate(`/news/${newsId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">แก้ไขโพสต์ (Admin)</h1>
          <div className="flex gap-2">
            <button className="btn btn-sm" onClick={() => navigate(-1)}>ย้อนกลับ</button>
            <button className="btn btn-sm btn-error text-white" onClick={() => { if (confirm('ยืนยันลบข่าวนี้?')) { deleteNews(newsId); navigate('/news'); }}}>ลบ</button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเรื่อง</label>
            <input className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <p className="text-error text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ลิงก์รูปภาพ (URL)</label>
            <input className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
            {errors.image && <p className="text-error text-xs mt-1">{errors.image}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">แท็ก (คั่นด้วย ,)</label>
            <input className="input input-bordered w-full" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ai, devops, web" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา</label>
            <textarea className={`textarea textarea-bordered w-full ${errors.content ? 'textarea-error' : ''}`} rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
            {errors.content && <p className="text-error text-xs mt-1">{errors.content}</p>}
          </div>
          <div>
            <button type="submit" className="btn btn-primary">บันทึกการแก้ไข</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditPost;
