import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import { useAuth } from "../context/AuthContext";

function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const newsId = Number(id);
  const { items, deleteNews } = useNews();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const news = items.find((n) => n.id === newsId);

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto text-center text-gray-700">
          <h1 className="text-2xl font-bold mb-2">ไม่พบข่าว</h1>
          <p className="mb-6">รายการที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
       
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{news.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {news.author} | {news.date}
        </p>
        {isAdmin && (
          <div className="flex gap-2 mb-6">
            <button className="btn btn-sm" onClick={() => navigate(`/admin/edit-post/${newsId}`)}>Edit</button>
            <button
              className="btn btn-sm btn-error text-white"
              onClick={() => {
                const Swal = window.Swal;
                if (Swal) {
                  Swal.fire({
                    title: 'ยืนยันการลบ?',
                    text: 'ข้อมูลจะถูกลบออกจากระบบ (จำลอง)',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'ลบ',
                    cancelButtonText: 'ยกเลิก',
                    confirmButtonColor: '#ef4444'
                  }).then((res) => {
                    if (res.isConfirmed) { deleteNews(newsId); navigate('/news'); }
                  });
                } else if (confirm('ยืนยันลบข่าวนี้?')) {
                  deleteNews(newsId); navigate('/news');
                }
              }}
            >Delete</button>
          </div>
        )}
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{news.detail || news.content}</p>
        <div className="mt-8">
          <Link to="/" className="inline-block text-blue-600 hover:underline">
            ← กลับไปหน้า ข่าวทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
