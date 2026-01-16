import React from "react";
import { Link } from "react-router-dom";

const Post = ({ postDetail, index = 0 }) => {
  const { _id, title, cover, author, createdAt, summary } = postDetail;
  const isEven = index % 2 === 0;

  return (
    <div className="w-full mb-8">
      <div
        className={`card card-side bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 overflow-hidden ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Image */}
        <figure className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <img src={cover} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </figure>

        {/* Content */}
        <div className="card-body gap-4 p-6">
          <div>
            <h2 className="card-title text-2xl font-bold text-slate-800 mb-2">{title}</h2>
            <p className="line-clamp-3 text-base text-slate-600 leading-relaxed">{summary}</p>
          </div>

          <div className="card-actions justify-between items-center mt-auto pt-4 border-t border-slate-100">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-blue-600">By {author?.username}</span>
              <span className="text-xs text-slate-500">{createdAt}</span>
            </div>

            <Link to={`/post/${_id}`} className="btn btn-primary btn-sm gap-2">
              อ่านต่อ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
