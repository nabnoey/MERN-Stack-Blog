import React from "react";
import { Link } from "react-router-dom";

const Post = ({ postDetail, index = 0 }) => {
  const { id, title, cover, author, createdAt, sumary } = postDetail;
  const isEven = index % 2 === 0;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div
        className={`card card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Image */}
        <figure className="w-64 h-64 flex-shrink-0">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Content */}
        <div className="card-body gap-3">
          <h2 className="card-title">{title}</h2>

          <p className="line-clamp-2 text-sm opacity-80">
            {sumary}
          </p>

          <div className="card-actions justify-between items-center mt-2">
            <div className="badge badge-primary badge-outline">
              {author} • {createdAt}
            </div>

            <Link to={`/post/${id}`} className="btn btn-primary btn-sm">
              อ่านต่อ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
