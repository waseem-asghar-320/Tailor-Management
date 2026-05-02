import { useState } from "react";
import styles from "./Sidebar.module.css";

import { FaHome, FaUsers, FaFileInvoice, FaReceipt, FaChartBar, FaCog } from "react-icons/fa";

function Sidebar({ open, setOpen }) {
  const [active, setActive] = useState(null);

  const toggleMenu = (menu) => {
    setActive(active === menu ? null : menu);
  };

  return (
    <div className={`${styles.sidebar} ${open ? styles.show : ""}`}>
      
      {/* Close button */}
      <div className={styles.top}>
        <h2>My App</h2>
        <button onClick={() => setOpen(false)} className={styles.closeBtn}>
          ✖
        </button>
      </div>
      <hr />
      {/* HOME */}
      <div className={styles.item}>
        <FaHome /> <span>HOME</span>
      </div>

      {/* CUSTOMERS */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("customers")}>
          <FaUsers /> <span>CUSTOMERS</span>
          <span className={styles.arrow}>{active === "customers" ? "▼" : ">"}</span>
        </div>
        {active === "customers" && (
          <div className={styles.sub}>
            <p>Add Customer</p>
            <p>View Customers</p>
          </div>
        )}
      </div>

      {/* INVOICE */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("invoice")}>
          <FaFileInvoice /> <span>INVOICE</span>
          <span className={styles.arrow}>{active === "invoice" ? "▼" : ">"}</span>
        </div>
        {active === "invoice" && (
          <div className={styles.sub}>
            <p>Create Invoice</p>
            <p>Invoice List</p>
          </div>
        )}
      </div>

      {/* VOUCHERS */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("vouchers")}>
          <FaReceipt /> <span>VOUCHERS</span>
          <span className={styles.arrow}>{active === "vouchers" ? "▼" : ">"}</span>
        </div>
        {active === "vouchers" && (
          <div className={styles.sub}>
            <p>Add Voucher</p>
            <p>Voucher List</p>
          </div>
        )}
      </div>

      {/* REPORT */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("report")}>
          <FaChartBar /> <span>REPORT</span>
          <span className={styles.arrow}>{active === "report" ? "▼" : ">"}</span>
        </div>
        {active === "report" && (
          <div className={styles.sub}>
            <p>Sales Report</p>
            <p>Customer Report</p>
          </div>
        )}
      </div>

      {/* MANAGMENT */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("management")}>
          <FaCog /> <span>MANAGMENT</span>
          <span className={styles.arrow}>{active === "management" ? "▼" : ">"}</span>
        </div>
        {active === "management" && (
          <div className={styles.sub}>
            <p>Settings</p>
            <p>Users</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Sidebar;