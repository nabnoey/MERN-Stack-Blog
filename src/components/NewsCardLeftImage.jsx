import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNews } from "../context/NewsContext";

function NewsCardLeftImage({ id, title, author, date, content, image }) {
  const { user } = useAuth();
  const { deleteNews } = useNews();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  return (
    <div className="relative">
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            className="btn btn-xs"
            title="แก้ไข"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/admin/edit-post/${id}`); }}
          >Edit</button>
          <button
            className="btn btn-xs btn-error text-white"
            title="ลบ"
            onClick={(e) => {
              e.preventDefault(); e.stopPropagation();
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
                }).then((res) => { if (res.isConfirmed) deleteNews(id); });
              } else if (confirm('ยืนยันการลบข่าวนี้?')) {
                deleteNews(id);
              }
            }}
          >Delete</button>
        </div>
      )}
      <Link to={`/news/${id}`} className="block">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition duration-200 cursor-pointer">
          <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* ฝั่งรูป */}
          <div className="w-full md:w-1/3">
            <img
              src={image}
              alt={title}
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>

          {/* ฝั่งข้อความ */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              {title}
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              {author} | {date}
            </p>

            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {content}
            </p>
          </div>

          </div>
        </div>
      </Link>
    </div>
  );
}

export default NewsCardLeftImage;
