import styles from './Invoice.module.css';
import { useNavigate } from "react-router-dom";
// 👇 import icons

import { MdShoppingCart, MdAssignmentReturn, MdInventory } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";



const data = [
  { title: "Add Invoice", icon: <IoIosAddCircleOutline />, color: "#a330a3", bg: "#fec7fa" },
  { title: "Purchase", icon: <MdShoppingCart />, color: "#3730A3", bg: "#C7D2FE" },   // blue-indigo
  { title: "Purchase Return", icon: <MdAssignmentReturn />, color: "#9D174D", bg: "#FBCFE8" },          // pink
  { title: "Stock Adjustment", icon: <MdInventory />, color: "#6D28D9", bg: "#DDD6FE" },         // purple
  
];

function Invoice() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Purchase") navigate("/purchase-form");
    else if (title === "Add Invoice") navigate("/add-invoice-form");
    else if (title === "Purchase Return") navigate("/purchase-return-form");
    else if (title === "Stock Adjustment") navigate("/stock-adjustment-form");
  };

  return (
    <>
      <h2 className={styles.heading}>Invoices</h2>

      <div className={styles.container}>
        
        <div className={styles.grid}>
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleClick(item.title)}
              style={{ cursor: "pointer",backgroundColor: item.bg}}
            >
              {/* 👇 ICON instead of IMG */}
              {/* <div className={styles.icon}>{item.icon}</div> */}

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

export default Invoice;