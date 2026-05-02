import styles from './Production.module.css';
import { useNavigate } from "react-router-dom";
// 👇 import icons


import { GiSewingMachine,GiReceiveMoney } from "react-icons/gi";
import { IoCut } from "react-icons/io5";
import { MdCallReceived } from "react-icons/md";

const data = [
  { title: "Karigar", icon: <GiSewingMachine />, color: "#3730A3", bg: "#C7D2FE" },   // blue-indigo
  { title: "Cutting", icon: <IoCut />, color: "#9D174D", bg: "#FBCFE8" },          // pink
  { title: "Karigar Receiving", icon: <GiReceiveMoney />, color: "#6D28D9", bg: "#DDD6FE" },         // purple
  { title: "Cutting Receiving", icon: <MdCallReceived />, color: "#166534", bg: "#D1FAE5" },         // green
];

function Production() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Karigar") navigate("/karigar-form");
    else if (title === "Cutting") navigate("/cutting-form");
    else if (title === "Karigar Receiving") navigate("/karigar-receiving-form");
    else if (title === "Cutting Receiving") navigate("/cutting-receiving-form");
  };

  return (
    <>
    
        <span className={styles.heading}>Production</span>
   
     

      <div className={styles.container}>
        
        <div className={styles.grid}>
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleClick(item.title)}
              style={{ cursor: "pointer",backgroundColor: item.bg}}
            >
             

              <div
              className={styles.icon}
              style={{
                color: item.color,
                backgroundColor: item.bg,
              }}
            >
              {item.icon}
            </div>

              <p style={{ color: item.color }}>
              {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Production;