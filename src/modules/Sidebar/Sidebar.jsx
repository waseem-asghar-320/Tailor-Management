import { useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";

import { FaHome, FaUsers, FaFileInvoice, FaReceipt, FaChartBar, FaCog } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";

function Sidebar({ open, setOpen }) {
  const [active, setActive] = useState(null);

  const toggleMenu = (menu) => {
    setActive(active === menu ? null : menu);
  };
  const navigate = useNavigate();

  return (
    <div className={`${styles.sidebar} ${open ? styles.show : ""}`}>
      
      {/* Close button */}
      <div className={styles.top}>
        <h2> <GiSewingMachine /> Tailor Soft</h2>
        <button onClick={() => setOpen(false)} className={styles.closeBtn}>
          ✖
        </button>
      </div>
      <hr />
      {/* HOME */}
      <div className={styles.item} onClick={() =>
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
  }>
        <FaHome /> <span>HOME</span>
      </div>

     

      {/* CUSTOMERS */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("customers")}>
          <FaUsers /> <span>CUSTOMERS</span>
          <span className={styles.arrow}>{active === "customers" ? "▼" : "▶"}</span>
        </div>
        {active === "customers" && (
          <div className={styles.sub}>
            <p onClick={() => navigate("/booking-form")}>Booking</p>
            <p onClick={() => navigate("/delivery-form")}>Delivery</p>
            <p onClick={() => navigate("/receipt-form")}>Receipt</p>
            <p onClick={() => navigate("/shalwaar-kameez-form")}>Shalwaar Qameez</p>
            <p>Delivery Report</p>
            <p>Customer Ledger</p>
            <p>Customer Balances</p>
            <p>Home Delivery List</p>
            <p>Unpaid Deliveries</p>
            <p>Find Bookings</p>
            <p>Issue Report</p>
            <p>Delivery Check</p>
            <p>Trial Date Check</p>
            <p>Not Sent to Karigar</p>
            <p>Karigar Work Summary</p>
            <p>Add/Edit Customers</p>
          </div>
        )}
      </div>

       {/* PRODUCTION */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("production")}>
          <MdOutlineProductionQuantityLimits /> <span>PRODUCTION</span>
          <span className={styles.arrow}>{active === "production" ? "▼" : "▶"}</span>
        </div>
        {active === "production" && (
          <div className={styles.sub}>
            <p>Karigar</p>
            <p>Cutting</p>
            <p>Karigar Receiving</p>
            <p>Cutting Receiving</p>
            
          </div>
        )}
      </div>

      {/* INVOICE */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("invoice")}>
          <FaFileInvoice /> <span>INVOICE</span>
          <span className={styles.arrow}>{active === "invoice" ? "▼" : "▶"}</span>
        </div>
        {active === "invoice" && (
          <div className={styles.sub}>
            <p>Purchase</p>
            <p>Purchase Return</p>
            <p>Stock Adjustment</p>
          </div>
        )}
      </div>

      {/* VOUCHERS */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("vouchers")}>
          <FaReceipt /> <span>VOUCHERS</span>
          <span className={styles.arrow}>{active === "vouchers" ? "▼" : "▶"}</span>
        </div>
        {active === "vouchers" && (
          <div className={styles.sub}>
            <p>Petty Cash</p>
            <p>Bank Payment</p>
            <p>Bank Receipt</p>
          </div>
        )}
      </div>

      {/* REPORT */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("report")}>
          <FaChartBar /> <span>REPORT</span>
          <span className={styles.arrow}>{active === "report" ? "▼" : "▶"}</span>
        </div>
        {active === "report" && (
          <div className={styles.sub}>
            <p>Ledger</p>
            <p>Cash Activity</p>
            <p>Cash Book</p>
            <p>Bank Book</p>
            <p>Expenses Summary</p>
            <p>Karigar Work Detail</p>
            <p>Sales</p>
            <p>Profit on Sale</p>
            <p>Tax Report</p>
            <p>Purchases</p>
            <p>Products List</p>
            <p>Chart of Accounts</p>
            <p>Stock Report</p>
            <p>Item Ledger</p>
            <p>Stock Adjustments</p>
            <p>Trial Balance</p>
            <p>Profit & Loss</p>
            <p>Balance Sheet</p>
            
          </div>
        )}
      </div>

      {/* MANAGMENT */}
      <div>
        <div className={styles.item} onClick={() => toggleMenu("management")}>
          <FaCog /> <span>MANAGMENT</span>
          <span className={styles.arrow}>{active === "management" ? "▼" : "▶"}</span>
        </div>
        {active === "management" && (
          <div className={styles.sub}>
            <p>Chart of Accounts</p>
            <p>Add/Edit Items</p>
            <p>Branch Management</p>
            <p>Karigar Rates</p>
            <p>Designs</p>
            <p>Extras</p>
            <p>Change Password</p>
            <p>User Management</p>
            <p>User Authorization</p>
            <p>Settings</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Sidebar;