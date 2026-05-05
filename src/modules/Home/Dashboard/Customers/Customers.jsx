import { useNavigate } from "react-router-dom";
import styles from "./Customers.module.css";

// 👇 import icons
import { FaClipboardList, FaTruck, FaReceipt, FaTshirt } from "react-icons/fa";
import { MdReport, MdAccountBalanceWallet, MdDeliveryDining } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { BsExclamationTriangle } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";

const data = [
  { title: "Booking", icon: <FaClipboardList />, color: "#3730A3", bg: "#C7D2FE" },   // blue-indigo
  { title: "Delivery", icon: <FaTruck />, color: "#9D174D", bg: "#FBCFE8" },          // pink
  { title: "Receipt", icon: <FaReceipt />, color: "#6D28D9", bg: "#DDD6FE" },         // purple
  { title: "Shalwaar Qameez", icon: <FaTshirt />, color: "#C2410C", bg: "#FED7AA" },  // orange

  { title: "Delivery Report", icon: <MdReport />, color: "#0F766E", bg: "#99F6E4" }, 
  { title: "Customer Ledger", icon: <MdAccountBalanceWallet />, color: "#334155", bg: "#CBD5F5" },
  { title: "Customer Balances", icon: <MdAccountBalanceWallet />, color: "#047857", bg: "#A7F3D0" },
  { title: "Home Delivery List", icon: <MdDeliveryDining />, color: "#92400E", bg: "#FDE68A" },

  { title: "Unpaid Deliveries", icon: <BsExclamationTriangle />, color: "#991B1B", bg: "#FCA5A5" },
  { title: "Find Bookings", icon: <AiOutlineSearch />, color: "#1E40AF", bg: "#BFDBFE" },

  { title: "Issue Report", icon: <BsExclamationTriangle />, color: "#7F1D1D", bg: "#FCA5A5" },
  { title: "Delivery Check", icon: <FiCheckCircle />, color: "#166534", bg: "#86EFAC" },
  { title: "Trial Date Check", icon: <FiCheckCircle />, color: "#047857", bg: "#6EE7B7" },
  { title: "Not Sent to Karigar", icon: <BsExclamationTriangle />, color: "#9A3412", bg: "#FDBA74" },

  { title: "Karigar Work Summary", icon: <MdReport />, color: "#5B21B6", bg: "#C4B5FD" },
  { title: "Add/Edit Customers", icon: <FaUserEdit />, color: "#1F2937", bg: "#CBD5E1" },
];

function Customers() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Booking") navigate("/booking-form");
    else if (title === "Delivery") navigate("/delivery-form");
    else if (title === "Receipt") navigate("/receipt-form");
    else if (title === "Shalwaar Qameez") navigate("/shalwaar-kameez-form");
    else if (title === "Delivery Report") navigate("/delivery-report");
    else if (title === "Customer Ledger") navigate("/customer-ledger-form");
    else if (title === "Customer Balances") navigate("/customer-balances-form");
    else if (title === "Home Delivery List") navigate("/home-delivery-list-form");
    else if (title === "Unpaid Deliveries") navigate("/unpaid-deliveries-form");
    else if (title === "Find Bookings") navigate("/find-bookings-form");
    else if (title === "Issue Report") navigate("/issue-report-form");
    else if (title === "Delivery Check") navigate("/delivery-check-form");
    else if (title === "Trial Date Check") navigate("/trial-date-check-form");
    else if (title === "Not Sent to Karigar") navigate("/not-sent-to-karigar-form");
    else if (title === "Karigar Work Summary") navigate("/karigar-work-summary-form");
    else if (title === "Add/Edit Customers") navigate("/add-edit-customers-form");
  };

  return (
    <>
      <h2 className={styles.heading}>Customers</h2>

      <div className={styles.container}>
        <div className={styles.grid}>
          {data.map((item, index) => (
            <div key={index} className={styles.card} onClick={() => handleClick(item.title)}
              style={{ cursor: "pointer",backgroundColor: item.bg}} >
           
             

              <div className={styles.icon} style={{ color: item.color,backgroundColor: item.bg,}}>

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

export default Customers;