import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { newsData as initialNews } from "../data/newsData";

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("newsItems");
      if (raw) return JSON.parse(raw);
    } catch {}
    return initialNews;
  });

  useEffect(() => {
    try {
      localStorage.setItem("newsItems", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addNews = (payload) => {
    const nextId = (items.reduce((m, it) => Math.max(m, it.id), 0) || 0) + 1;
    setItems((prev) => [{ ...payload, id: nextId }, ...prev]);
  };

  const updateNews = (id, updates) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  };

  const deleteNews = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const value = useMemo(
    () => ({ items, addNews, updateNews, deleteNews }),
    [items]
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNews must be used within NewsProvider");
  return ctx;
}

