import styles from './Report.module.css';
import { useNavigate } from "react-router-dom";
// 👇 import icons

import {
  FaBook,
  FaMoneyBillWave,
  FaCashRegister,
  FaUniversity,
  FaFileInvoiceDollar,
  FaUserCog,
  FaShoppingCart,
  FaChartLine,
  FaReceipt,
  FaBoxOpen,
  FaChartPie,
  FaWarehouse,
  FaClipboardList,
  FaBalanceScale,
  FaChartBar
} from "react-icons/fa";



const data = [
   { title:"Ledger", icon:<FaBook/>, color:"#3b82f6", bg:"#bfdbfe" },
  { title:"Cash Activity", icon:<FaMoneyBillWave/>, color:"#10b981", bg:"#a7f3d0" },
  { title:"Cash Book", icon:<FaCashRegister/>, color:"#f59e0b", bg:"#fde68a" },
  { title:"Bank Book", icon:<FaUniversity/>, color:"#6366f1", bg:"#c7d2fe" },
  { title:"Expenses Summary", icon:<FaFileInvoiceDollar/>, color:"#ef4444", bg:"#fecaca" },
  { title:"Karigar Work Detail", icon:<FaUserCog/>, color:"#8b5cf6", bg:"#ddd6fe" },
  { title:"Sales", icon:<FaShoppingCart/>, color:"#14b8a6", bg:"#99f6e4" },
  { title:"Profit on Sale", icon:<FaChartLine/>, color:"#22c55e", bg:"#bbf7d0" },
  { title:"Tax Report", icon:<FaReceipt/>, color:"#f97316", bg:"#fed7aa" },
  { title:"Purchases", icon:<FaShoppingCart/>, color:"#0ea5e9", bg:"#bae6fd" },
  { title:"Products List", icon:<FaBoxOpen/>, color:"#a855f7", bg:"#e9d5ff" },
  { title:"Chart of Accounts", icon:<FaChartPie/>, color:"#e11d48", bg:"#fecdd3" },
  { title:"Stock Report", icon:<FaWarehouse/>, color:"#84cc16", bg:"#d9f99d" },
  { title:"Item Ledger", icon:<FaClipboardList/>, color:"#06b6d4", bg:"#a5f3fc" },
  { title:"Stock Adjustments", icon:<FaClipboardList/>, color:"#f43f5e", bg:"#fecdd3" },
  { title:"Trial Balance", icon:<FaBalanceScale/>, color:"#64748b", bg:"#e2e8f0" },
  { title:"Profit & Loss", icon:<FaChartBar/>, color:"#16a34a", bg:"#bbf7d0" },
];

function Report() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Ledger") navigate("/ledger-form");
    else if (title === "Cash-Back") navigate("/cash-back-form");
    else if (title === "Bank Book") navigate("/bank-book-form");
    else if (title === "Expenses Summary") navigate("/expenses-summary-form");
    else if (title === "Karigar Work Detail") navigate("/karigar-work-detail-form");
    else if (title === "Sales") navigate("/sales");
    else if (title === "Profit & Loss") navigate("/profit-loss-form");
    else if (title === "Tax Report") navigate("/tax-report-form");
    else if (title === "Purchases") navigate("/purchases-form");
    else if (title === "Products List") navigate("/products-list-form");
    else if (title === "Chart of Accounts") navigate("/chart-of-accounts-form");
    else if (title === "Stock Report") navigate("/stock-report-form");
    else if (title === "Item Ledger") navigate("/item-ledger-form");
    else if (title === "Stock Adjustments") navigate("/stock-adjustments-form");
    else if (title === "Trial Balance") navigate("/trial-balance-form");
    else if (title === "Profit & Loss") navigate("/profit-loss-form");
  };

  return (
    <>
      <h2 className={styles.heading}>Reports</h2>

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

export default Report;