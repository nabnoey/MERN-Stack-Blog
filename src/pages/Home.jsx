import React from "react";
import NewsCardRightImage from "../components/NewsCardRightImage";
import NewsCardLeftImage from "../components/NewsCardLeftImage";
import { useNews } from "../context/NewsContext";

function Home() {
  const { items } = useNews();
  return (
    <div className="container mx-auto px-4 mt-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">ข่าวทั้งหมด</h1>
      {items.slice(0, 4).map((news, idx) => (
        idx % 2 === 0 ? (
          <NewsCardLeftImage
            key={news.id}
            id={news.id}
            title={news.title}
            author={news.author}
            date={news.date}
            content={news.description || news.content}
            image={news.image}
          />
        ) : (
          <NewsCardRightImage
            key={news.id}
            id={news.id}
            title={news.title}
            author={news.author}
            date={news.date}
            content={news.description || news.content}
            image={news.image}
          />
        )
      ))}
    </div>
  );
}

export default Home;






