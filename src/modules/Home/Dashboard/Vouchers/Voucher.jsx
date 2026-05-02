import styles from './Voucher.module.css';
import { useNavigate } from "react-router-dom";
// 👇 import icons

import { FaWallet, FaUniversity, FaHandHoldingUsd } from "react-icons/fa";



const data = [
  { title:"Petty Cash", icon:<FaWallet/>, color:"#eab308", bg:"#fde68a" },
  { title:"Bank Payment", icon:<FaUniversity/>, color:"#3b82f6", bg:"#bfdbfe" },
  { title:"Bank Receipt", icon:<FaHandHoldingUsd/>, color:"#22c55e", bg:"#bbf7d0" },
];

function Voucher() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Petty Cash") navigate("/petty-cash-form");
    else if (title === "Bank Payment") navigate("/bank-payment-form");
    else if (title === "Bank Receipt") navigate("/bank-receipt-form");
  };

  return (
    <>
      <h2 className={styles.heading}>Vouchers</h2>

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

export default Voucher;