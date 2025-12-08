import React from "react";
import NewsCardLeftImage from "../components/NewsCardLeftImage";
import { useNews } from "../context/NewsContext";


function NewsList() {
  const { items } = useNews();
  return (
    <div className="min-h-screen  py-10 px-4 ">
      <div className="max-w-5xl mx-auto ">
        <h1 className="text-3xl text-black font-bold text-center mb-8 ">
          ข่าวทั้งหมด
        </h1>

        {items.map((news) => (
          <NewsCardLeftImage
            key={news.id}
           id={news.id}   
            title={news.title}
            author={news.author}
            date={news.date}
            content={news.description || news.content}
            image={news.image}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsList;
