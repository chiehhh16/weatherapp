import { useState, useEffect } from "react";
import "./App.css";




export default function App() {
  const [flipped, setFlipped] = useState(false);
  const [todo, setTodo] = useState("");


  const [city, setCity] = useState("Tainan");


  const cityList = [
    "Taipei","New Taipei","Keelung","Taoyuan","Hsinchu","Hsinchu County",
    "Miaoli","Taichung","Changhua","Nantou","Yunlin",
    "Chiayi","Chiayi County","Tainan","Kaohsiung","Pingtung",
    "Yilan","Hualien","Taitung","Penghu"
  ];


  const [todos, setTodos] = useState(
    Object.fromEntries(cityList.map(c => [c, []]))
  );


  const [weather, setWeather] = useState(null);


  const API_KEY = "b0b43fa9d03f8dd01691dd785eb15a2c";


  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch(() => {
        setWeather(null);
      });
  }, [city]);




  const handleFlip = () => {
    setFlipped(!flipped);
  };




  const addTodo = () => {
    if (todo.trim() === "") return;


    setTodos({
      ...todos,
      [city]: [...todos[city], todo],
    });


    setTodo("");
  };




  const deleteTodo = (index) => {
    const newTodos = todos[city].filter((_, i) => i !== index);




    setTodos({
      ...todos,
      [city]: newTodos,
    });
  };




  return (
    <div style={styles.page}>
      <div style={styles.shell1}>🐚</div>
      <div style={styles.shell2}>🪸</div>
      <div style={styles.shell3}>🫧</div>
      <div style={styles.shell4}>🐠</div>
      <div style={styles.shell5}>⭐</div>




      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div
            style={{
              ...styles.card,
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            onClick={handleFlip}
          >
            <div style={{ ...styles.face, ...styles.front }}>
              <img src="/finn.jpg" alt="avatar" style={styles.avatar} />
              <h2>方虹絜</h2>
              <p>資工系三甲</p>
              <p>5b2g0016</p>
              <p style={styles.tip}>點一下卡片翻面</p>
            </div>




            <div style={{ ...styles.face, ...styles.back }}>
              <h2>About Me</h2>
              <p>我正在學習 React，這是一個翻轉卡片作品。</p>
              <p>Email: 5b2g0016@stust.edu.tw</p>
              <p style={styles.tip}>再點一次回正面</p>
            </div>
          </div>
        </div>




        <div style={styles.divider}></div>




        <div style={styles.todoContainer}>
          <h2 style={styles.todoTitle}>🌴My Todo List</h2>




          {/* ⭐ 城市選單（改這裡） */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.select}
          >
            {cityList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div style={styles.weatherBox}>
            {weather && weather.main ? (
              <>
                <strong>{weather.name}</strong>
                <p>🌡 {weather.main.temp} °C
                  {Math.abs(weather.main.temp - weather.main.feels_like) >= 0.8 && (
                  <span> (感覺像{weather.main.feels_like} °C)</span>
                  )}
                </p>
                <div style={styles.weatherRow}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="weather icon"
          style={styles.weatherIcon}
        />
        <p style={styles.weatherDesc}>
          {weather.weather[0].description}
        </p>
      </div>
              </>
            ) : (
              <p>載入天氣中...</p>
            )}
          </div>


          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="今天要完成什麼..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              style={styles.input}
            />
            <button onClick={addTodo} style={styles.button}>
              新增
            </button>
          </div>


          <ul style={styles.list}>
            {todos[city].map((item, index) => (
              <li key={index} style={styles.listItem}>
                {item}
                <button
                  onClick={() => deleteTodo(index)}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}




const styles = {
  weatherRow: {
    display: "flex",       // 啟動彈性盒模型，強迫子元素排成一橫排
    alignItems: "center",  // 讓 ICON 和文字在垂直方向對齊（垂直居中）
    gap: "4px",            // 設定 ICON 和文字之間的間距（可依喜好調整）
    marginTop: "5px",      // 跟上面的溫度稍微隔開一點
  },


  weatherIcon: {
    width: "35px",         // 調整圖片寬度，讓它跟文字一樣精緻
    height: "35px",        // 調整圖片高度
    display: "block",
  },


  weatherDesc: {
    margin: 0,             // 清除 <p> 標籤預設的上下邊距，避免排版跑掉
  },


  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "none",
  },




  weatherBox: {
    background: "rgba(255,255,255,0.85)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "14px",
  },




  // === 以下完全照你原本 ===
  page: {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    background:
      "linear-gradient(to bottom, #6dd5fa 0%, #bdefff 45%, #ffe7a3 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "sans-serif",
    padding: "20px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },




  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
    zIndex: 2,
  },




  container: {
    perspective: "1200px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },




  card: {
    width: "320px",
    height: "400px",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.8s",
    cursor: "pointer",
    boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
    borderRadius: "24px",
  },




  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "24px",
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(10px)",
    boxSizing: "border-box",
  },




  front: {},




  back: {
    transform: "rotateY(180deg)",
    background: "linear-gradient(135deg,#38bdf8,#0ea5e9)",
    color: "white",
  },




  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid white",
    marginBottom: "20px",
  },




  tip: {
    marginTop: "15px",
    fontSize: "13px",
    opacity: 0.8,
  },




  divider: {
    width: "320px",
    height: "4px",
    background: "linear-gradient(to right,#ffffff,#38bdf8,#ffffff)",
    borderRadius: "999px",
    margin: "10px 0",
  },




  todoContainer: {
    width: "100%",
    maxWidth: "350px",
    padding: "30px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    boxSizing: "border-box",
  },




  todoTitle: {
    textAlign: "center",
    marginBottom: "20px",
    marginTop: 0,
  },




  inputArea: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },




  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },




  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },




  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },




  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.8)",
  },




  deleteBtn: {
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },




  shell1: { position: "absolute", top: "10%", left: "10%", fontSize: "50px" },
  shell2: { position: "absolute", bottom: "15%", right: "10%", fontSize: "60px" },
  shell3: { position: "absolute", top: "25%", right: "20%", fontSize: "40px" },
  shell4: { position: "absolute", bottom: "20%", left: "15%", fontSize: "45px" },
  shell5: { position: "absolute", top: "18%", left: "45%", fontSize: "35px" },
};
