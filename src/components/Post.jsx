import React from "react";
import { Link } from "react-router-dom";
const Post = ({ postDetail, index = 0 }) => {
  const { id, title, cover, author, createdAt, sumary } = postDetail;
  const isEven = index % 2 == 0;
  return (
    <a
      href={`/post/${id}`}
      className={`card card-side bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
      key={id}
    >
      <figure className="md:1/2 flex items-center justify-center  ">
        <img src={cover} alt={title} className="w-64 h-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>

        <p className="line-clamp-2">{sumary}</p>

        <div className="card-actions justify-between items-center">
          <div className="badge badge-primary badge-outline">
            {author} {createdAt}
          </div>

          <Link to={`/post/${id}`} className="btn btn-primary btn-sm">
            อ่านต่อ
          </Link>
        </div>
      </div>
    </a>
  );
};
export default Post;