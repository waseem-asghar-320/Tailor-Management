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
  { title: "Ledger", icon: <FaBook />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "View account ledgers" },
  { title: "Cash Activity", icon: <FaMoneyBillWave />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Cash transaction history" },
  { title: "Cash Book", icon: <FaCashRegister />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Daily cash records" },
  { title: "Bank Book", icon: <FaUniversity />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Bank transaction records" },
  { title: "Expenses Summary", icon: <FaFileInvoiceDollar />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Expense reports" },
  { title: "Karigar Work Detail", icon: <FaUserCog />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Worker work summary" },
  { title: "Sales", icon: <FaShoppingCart />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Sales reports" },
  { title: "Profit On Sale", icon: <FaChartLine />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Profit analysis" },
  { title: "Tax Report", icon: <FaReceipt />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Tax calculations" },
  { title: "Purchases", icon: <FaShoppingCart />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Purchase reports" },
  { title: "Products List", icon: <FaBoxOpen />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Product inventory" },
  { title: "Chart of Accounts", icon: <FaChartPie />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Account structure" },
  { title: "Stock Report", icon: <FaWarehouse />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Stock status" },
  { title: "Item Ledger", icon: <FaClipboardList />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Item-wise transactions" },
  { title: "Stock Adjustments", icon: <FaClipboardList />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Stock changes" },
  { title: "Trial Balance", icon: <FaBalanceScale />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Financial balance" },
  { title: "Profit & Loss", icon: <FaChartBar />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "P&L statement" },
];

function Report() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const routes = {
      "Ledger": "/ledger-form",
      "Cash Activity": "/cash-activity-form",
      "Cash Book": "/cash-book-form",
      "Bank Book": "/bank-book-form",
      "Expenses Summary": "/expenses-summary-form",
      "Karigar Work Detail": "/karigar-work-detail-form",
      "Sales": "/sales",
      "Profit On Sale": "/profit-on-sale-form",
      "Tax Report": "/tax-report-form",
      "Purchases": "/purchases-form",
      "Products List": "/products-list-form",
      "Chart of Accounts": "/chart-of-accounts-form",
      "Stock Report": "/stock-report-form",
      "Item Ledger": "/item-ledger-form",
      "Stock Adjustments": "/stock-adjustments-form",
      "Trial Balance": "/trial-balance-form",
      "Profit & Loss": "/profit-loss-form"
    };
    navigate(routes[title]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>📊</div>
            <div>
              <h1 className={styles.mainTitle}>Reports</h1>
              <p className={styles.subtitle}>Comprehensive financial and operational reports</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{data.length}</span>
              <span className={styles.statLabel}>Reports</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Live</span>
              <span className={styles.statLabel}>Data</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={styles.card} 
              onClick={() => handleClick(item.title)}
              style={{ animationDelay: `${Math.min(index * 0.02, 0.5)}s` }}
            >
              <div className={styles.cardGlow}></div>
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper} style={{ background: item.bg }}>
                  <div className={styles.icon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.cardArrow}>→</div>
              </div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Report;