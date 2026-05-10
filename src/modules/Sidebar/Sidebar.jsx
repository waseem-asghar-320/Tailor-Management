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

const handleNavigate = (path) => {
  navigate(path);
  setOpen(false); // close sidebar
};


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
  <div
  className={styles.item}
  onClick={() => {
    navigate("/dashboard");
    setOpen(false);

    setTimeout(() => {
      document
        .getElementById("home")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
>
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
            <p onClick={() => handleNavigate("/booking-form")}>Booking</p>
            <p onClick={() => handleNavigate("/delivery-form")}>Delivery</p>
            <p onClick={() => handleNavigate("/receipt-form")}>Receipt</p>
            <p onClick={() => handleNavigate("/shalwaar-kameez-form")}>Shalwaar Qameez</p>
            <p onClick={() => handleNavigate("/delivery-report")}>Delivery Report</p>
            <p onClick={() => handleNavigate("/customer-ledger-form")}>Customer Ledger</p>
            <p onClick={() => handleNavigate("/customer-balances-form")}>Customer Balances</p>
            <p onClick={() => handleNavigate("/home-delivery-list")}>Home Delivery List</p>
            <p onClick={() => handleNavigate("/unpaid-deliveries")}>Unpaid Deliveries</p>
            <p onClick={() => handleNavigate("/find-bookings-form")}>Find Bookings</p>
            <p onClick={() => handleNavigate("/report-form")}>Report</p>
            <p onClick={() => handleNavigate("/delivery-check")}>Delivery Check</p>
            <p onClick={() => handleNavigate("/trial-date-check")}>Trial Date Check</p>
            <p onClick={() => handleNavigate("/not-sent-to-karigar")}>Not Sent to Karigar</p>
            <p onClick={() => handleNavigate("/karigar-work-summary")}>Karigar Work Summary</p>
            <p onClick={() => handleNavigate("/add-edit-customers-form")}>Add/Edit Customers</p>
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
            <p onClick={() => handleNavigate("/karigar-form")}>Karigar</p>
            <p onClick={() => handleNavigate("/cutting-form")}>Cutting</p>
            <p onClick={() => handleNavigate("/karigar-receiving-form")}>Karigar Receiving</p>
            <p onClick={() => handleNavigate("/cutting-receiving-form")}>Cutting Receiving</p>
            
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
            <p onClick={() => handleNavigate("/purchase-form")}>Purchase</p>
            <p onClick={() => handleNavigate("/purchase-return-form")}>Purchase Return</p>
            <p onClick={() => handleNavigate("/stock-adjustment-form")}>Stock Adjustment</p>
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
            <p onClick={() => handleNavigate("/petty-cash-form")}>Petty Cash</p>
            <p onClick={() => handleNavigate("/bank-payment-form")}>Bank Payment</p>
            <p onClick={() => handleNavigate("/bank-receipt-form")}>Bank Receipt</p>
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
            <p onClick={() => handleNavigate("/ledger")}>Ledger</p>
            <p onClick={() => handleNavigate("/cash-activity")}>Cash Activity</p>
            <p onClick={() => handleNavigate("/cash-book")}>Cash Book</p>
            <p onClick={() => handleNavigate("/bank-book")}>Bank Book</p>
            <p onClick={() => handleNavigate("/expenses-summary")}>Expenses Summary</p>
            <p onClick={() => handleNavigate("/karigar-work-detail")}>Karigar Work Detail</p>
            <p onClick={() => handleNavigate("/sales")}>Sales</p>
            <p onClick={() => handleNavigate("/profit-on-sale")}>Profit on Sale</p>
            <p onClick={() => handleNavigate("/tax-report")}>Tax Report</p>
            <p onClick={() => handleNavigate("/purchases")}>Purchases</p>
            <p onClick={() => handleNavigate("/products-list")}>Products List</p>
            <p onClick={() => handleNavigate("/chart-of-accounts")}>Chart of Accounts</p>
            <p onClick={() => handleNavigate("/stock-report")}>Stock Report</p>
            <p onClick={() => handleNavigate("/item-ledger")}>Item Ledger</p>
            <p onClick={() => handleNavigate("/stock-adjustments")}>Stock Adjustments</p>
            <p onClick={() => handleNavigate("/trial-balance")}>Trial Balance</p>
            <p onClick={() => handleNavigate("/profit-loss")}>Profit & Loss</p>
            <p onClick={() => handleNavigate("/balance-sheet")}>Balance Sheet</p>
            
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
            <p onClick={() => handleNavigate("/chart-of-accounts")}>Chart of Accounts</p>
            <p onClick={() => handleNavigate("/add-edit-items")}>Add/Edit Items</p>
            <p onClick={() => handleNavigate("/branch-management")}>Branch Management</p>
            <p onClick={() => handleNavigate("/karigar-rates")}>Karigar Rates</p>
            <p onClick={() => handleNavigate("/designs")}>Designs</p>
            <p onClick={() => handleNavigate("/extras")}>Extras</p>
            <p onClick={() => handleNavigate("/change-password")}>Change Password</p>
            <p onClick={() => handleNavigate("/user-management")}>User Management</p>
            <p onClick={() => handleNavigate("/user-authorization")}>User Authorization</p>
            <p onClick={() => handleNavigate("/settings")}>Settings</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Sidebar;