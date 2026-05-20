import { useNavigate } from "react-router-dom";
import styles from "./Customers.module.css";

// 👇 import icons
import { 
  FaClipboardList, FaTruck, FaReceipt, FaTshirt, FaUserEdit, 
  FaChartLine, FaWallet, FaBoxes, FaBell, FaSearch, 
  FaExclamationTriangle, FaCheckCircle, FaCalendarCheck, 
  FaTimesCircle, FaUsers, FaStar
} from "react-icons/fa";
import { MdReport, MdAccountBalanceWallet, MdDeliveryDining } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";

const data = [
  { title: "Booking", icon: <FaClipboardList />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Create new bookings" },
  { title: "Delivery", icon: <FaTruck />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage deliveries" },
  { title: "Receipt", icon: <FaReceipt />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Generate receipts" },
  { title: "Shalwaar Qameez", icon: <FaTshirt />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Design management" },
  { title: "Delivery Report", icon: <MdReport />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "View reports" },
  { title: "Customer Ledger", icon: <MdAccountBalanceWallet />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Transaction history" },
  { title: "Customer Balances", icon: <FaWallet />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "View balances" },
  { title: "Home Delivery List", icon: <MdDeliveryDining />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Track home deliveries" },
  { title: "Unpaid Deliveries", icon: <BsExclamationTriangle />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Pending payments" },
  { title: "Find Bookings", icon: <AiOutlineSearch />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Search bookings" },
  { title: "Issue Report", icon: <FaExclamationTriangle />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Issue tracking" },
  { title: "Delivery Check", icon: <FiCheckCircle />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Check status" },
  { title: "Trial Check", icon: <FaCalendarCheck />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Trial status" },
  { title: "Not Sent to Karigar", icon: <FaTimesCircle />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Pending items" },
  { title: "Karigar Work Summary", icon: <FaChartLine />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Work summary" },
  { title: "Add/Edit Customers", icon: <FaUserEdit />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage customers" },
];

function Customers() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const routes = {
      "Booking": "/bookings",
      "Delivery": "/deliveries",
      "Receipt": "/receipt-form",
      "Shalwaar Qameez": "/shalwaar-kameez-form",
      "Delivery Report": "/delivery-report",
      "Customer Ledger": "/customer-ledger-form",
      "Customer Balances": "/customer-balances-form",
      "Home Delivery List": "/home-delivery-list-form",
      "Unpaid Deliveries": "/unpaid-deliveries-form",
      "Find Bookings": "/find-bookings-form",
      "Issue Report": "/report-form",
      "Delivery Check": "/delivery-check-form",
      "Trial Check": "/trial-check-form",
      "Not Sent to Karigar": "/not-sent-to-karigar-form",
      "Karigar Work Summary": "/karigar-work-summary-form",
      "Add/Edit Customers": "/add-edit-customers-form"
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
            <div className={styles.headerIcon}>🎯</div>
            <div>
              <h1 className={styles.mainTitle}>Customers</h1>
              <p className={styles.subtitle}>Welcome back! Manage your business from here</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>16</span>
              <span className={styles.statLabel}>Modules</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Active</span>
              <span className={styles.statLabel}>System Online</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={styles.card} 
              onClick={() => handleClick(item.title)}
              style={{ animationDelay: `${index * 0.02}s` }}
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

export default Customers;