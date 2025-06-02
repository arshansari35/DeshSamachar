import React, { useState, useEffect } from "react";

const categories = [
  "national",
  "world",
  "technology",
  "sports",
  "entertainment",
];

const languages = {
  en: "English",
  hi: "हिंदी",
};

export default function App() {
  const [language, setLanguage] = useState("hi");
  const [category, setCategory] = useState("national");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://inshortsapi.vercel.app/news?category=${category}`
      );
      const data = await res.json();
      setNews(data.data);
    } catch (err) {
      alert("Khabar load karne me problem hai.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>
        {language === "hi" ? "देश समाचार (Desh Samachar)" : "Desh Samachar"}
      </h1>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {Object.entries(languages).map(([code, name]) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            style={{
              margin: "0 5px",
              padding: "8px 15px",
              backgroundColor: language === code ? "#4CAF50" : "#ddd",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              margin: "0 8px 8px 0",
              padding: "10px 15px",
              backgroundColor: category === cat ? "#2196F3" : "#eee",
              color: category === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {language === "hi" ? catHindi(cat) : cat}
          </button>
        ))}
      </div>

      <h2>{language === "hi" ? "टॉप खबरें" : "Top Stories"}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : news.length > 0 ? (
        <div>
          {news.slice(0, 3).map((item, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #ccc', marginBottom: 10 }}>
              <h3>{language === "hi" ? item.title_hi || item.title : item.title}</h3>
              <p>{language === "hi" ? item.content_hi || item.content : item.content}</p>
              <a href={item.url} target="_blank" rel="noreferrer">
                {language === "hi" ? "अधिक पढ़ें" : "Read more"}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>{language === "hi" ? "कोई खबर नहीं मिली" : "No news found"}</p>
      )}

      <h2>{language === "hi" ? "अन्य खबरें" : "More News"}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : news.length > 3 ? (
        <div>
          {news.slice(3).map((item, idx) => (
            <div key={idx} style={{ borderBottom: "1px solid #eee", marginBottom: 8 }}>
              <h4>{language === "hi" ? item.title_hi || item.title : item.title}</h4>
              <a href={item.url} target="_blank" rel="noreferrer">
                {language === "hi" ? "अधिक पढ़ें" : "Read more"}
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function catHindi(cat) {
  switch (cat) {
    case "national":
      return "राष्ट्रीय";
    case "world":
      return "दुनिया";
    case "technology":
      return "तकनीक";
    case "sports":
      return "खेल";
    case "entertainment":
      return "मनोरंजन";
    default:
      return cat;
  }
}
