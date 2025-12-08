import { Link } from "react-router-dom";
import { useNews } from "../context/NewsContext";

function NewsList() {
  const { items } = useNews();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ข่าวทั้งหมด
        </h1>

        <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-6">
          {items.map((news) => (
            <Link
              to={`/news/${news.id}`}
              key={news.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h2 className="text-xl font-semibold mb-2">
                {news.title}
              </h2>

              <p className="text-gray-600 text-sm">{news.description || news.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsList;



