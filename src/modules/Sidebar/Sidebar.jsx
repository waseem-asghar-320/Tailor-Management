import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

import { 
  FaHome, FaUsers, FaFileInvoice, FaReceipt, FaChartBar, FaCog,
  FaTachometerAlt, FaClipboardList, FaTruck, FaMoneyBillWave,
  FaBoxes, FaUserCog, FaSignOutAlt, FaChevronDown, FaChevronRight
} from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiSewingMachine } from "react-icons/gi";

function Sidebar({ open, setOpen }) {
  const [active, setActive] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  }, [location.pathname, setOpen]);

  const toggleMenu = (menu) => {
    setActive(active === menu ? null : menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  };

  const isActivePath = (paths) => {
    if (typeof paths === "string") {
      return location.pathname === paths;
    }
    return paths.includes(location.pathname);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)}></div>}
      
      <div className={`${styles.sidebar} ${open ? styles.show : ""}`}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <GiSewingMachine className={styles.logoIcon} />
            <span className={styles.logoText}>Tailor Soft</span>
          </div>
          <button onClick={() => setOpen(false)} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* User Profile Summary */}
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <span>👤</span>
          </div>
          <div className={styles.userInfo}>
            <h4>Admin User</h4>
            <p>Administrator</p>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Navigation Items */}
        <nav className={styles.nav}>
          {/* HOME */}
          <div
            className={`${styles.navItem} ${isActivePath("/home") ? styles.active : ""}`}
            onClick={() => handleNavigate("/home")}
          >
            <FaHome className={styles.navIcon} />
            <span>Home</span>
          </div>

        {/* dashboard button */}

        <div
  className={`${styles.navItem} ${isActivePath("/my-dashboard") ? styles.active : ""}`}
  onClick={() => handleNavigate("/my-dashboard")}
>
  <span className={styles.navIcon}>📊</span>
  <span>Dashboard</span>
</div>
          

          {/* CUSTOMERS */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "customers" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("customers")}
            >
              <FaUsers className={styles.navIcon} />
              <span>Customers</span>
              <span className={styles.arrow}>
                {active === "customers" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "customers" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/bookings")}>📋 Bookings</p>
                <p onClick={() => handleNavigate("/deliveries")}>🚚 Deliveries</p>
                <p onClick={() => handleNavigate("/receipt-form")}>🧾 Receipts</p>
                <p onClick={() => handleNavigate("/shalwaar-kameez-form")}>👕 Shalwaar Qameez</p>
                <p onClick={() => handleNavigate("/delivery-report")}>📊 Delivery Report</p>
                <p onClick={() => handleNavigate("/customer-ledger-form")}>📒 Customer Ledger</p>
                <p onClick={() => handleNavigate("/customer-balances-form")}>💰 Customer Balances</p>
                <p onClick={() => handleNavigate("/home-delivery-list-form")}>🏠 Home Delivery List</p>
                <p onClick={() => handleNavigate("/unpaid-deliveries-form")}>⚠️ Unpaid Deliveries</p>
                <p onClick={() => handleNavigate("/find-bookings-form")}>🔍 Find Bookings</p>
                <p onClick={() => handleNavigate("/delivery-check-form")}>✅ Delivery Check</p>
                <p onClick={() => handleNavigate("/trial-check-form")}>📅 Trial Check</p>
                <p onClick={() => handleNavigate("/not-sent-to-karigar")}>✂️ Not Sent to Karigar</p>
                <p onClick={() => handleNavigate("/karigar-work-summary")}>👨‍🔧 Karigar Work Summary</p>
                <p onClick={() => handleNavigate("/add-edit-customers-form")}>✏️ Add/Edit Customers</p>
              </div>
            )}
          </div>

          {/* PRODUCTION */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "production" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("production")}
            >
              <MdOutlineProductionQuantityLimits className={styles.navIcon} />
              <span>Production</span>
              <span className={styles.arrow}>
                {active === "production" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "production" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/karigar-form")}>👨‍🔧 Karigar</p>
                <p onClick={() => handleNavigate("/cutting-form")}>✂️ Cutting</p>
                <p onClick={() => handleNavigate("/karigar-receiving-form")}>📦 Karigar Receiving</p>
                <p onClick={() => handleNavigate("/cutting-receiving-form")}>📦 Cutting Receiving</p>
              </div>
            )}
          </div>

          {/* INVOICE */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "invoice" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("invoice")}
            >
              <FaFileInvoice className={styles.navIcon} />
              <span>Invoice</span>
              <span className={styles.arrow}>
                {active === "invoice" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "invoice" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/purchase-form")}>🛒 Purchase</p>
                <p onClick={() => handleNavigate("/purchase-return-form")}>↩️ Purchase Return</p>
                <p onClick={() => handleNavigate("/stock-adjustment-form")}>📦 Stock Adjustment</p>
              </div>
            )}
          </div>

          {/* VOUCHERS */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "vouchers" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("vouchers")}
            >
              <FaReceipt className={styles.navIcon} />
              <span>Vouchers</span>
              <span className={styles.arrow}>
                {active === "vouchers" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "vouchers" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/petty-cash-form")}>💰 Petty Cash</p>
                <p onClick={() => handleNavigate("/bank-payment-form")}>🏦 Bank Payment</p>
                <p onClick={() => handleNavigate("/bank-receipt-form")}>🏦 Bank Receipt</p>
              </div>
            )}
          </div>

          {/* REPORT */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "report" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("report")}
            >
              <FaChartBar className={styles.navIcon} />
              <span>Reports</span>
              <span className={styles.arrow}>
                {active === "report" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "report" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/ledger-form")}>📒 Ledger</p>
                <p onClick={() => handleNavigate("/cash-activity-form")}>💰 Cash Activity</p>
                <p onClick={() => handleNavigate("/cash-book-form")}>📕 Cash Book</p>
                <p onClick={() => handleNavigate("/bank-book-form")}>📘 Bank Book</p>
                <p onClick={() => handleNavigate("/expenses-summary-form")}>📊 Expenses Summary</p>
                <p onClick={() => handleNavigate("/karigar-work-detail-form")}>👨‍🔧 Karigar Work Detail</p>
                <p onClick={() => handleNavigate("/sales")}>📈 Sales</p>
                <p onClick={() => handleNavigate("/profit-on-sale-form")}>💰 Profit On Sale</p>
                <p onClick={() => handleNavigate("/tax-report-form")}>📑 Tax Report</p>
                <p onClick={() => handleNavigate("/purchases-form")}>🛒 Purchases</p>
                <p onClick={() => handleNavigate("/products-list-form")}>📦 Products List</p>
                <p onClick={() => handleNavigate("/chart-of-accounts-form")}>📊 Chart of Accounts</p>
                <p onClick={() => handleNavigate("/stock-report-form")}>📦 Stock Report</p>
                <p onClick={() => handleNavigate("/item-ledger-form")}>📒 Item Ledger</p>
                <p onClick={() => handleNavigate("/stock-adjustments-form")}>⚙️ Stock Adjustments</p>
                <p onClick={() => handleNavigate("/trial-balance-form")}>⚖️ Trial Balance</p>
                <p onClick={() => handleNavigate("/profit-loss-form")}>📈 Profit & Loss</p>
              </div>
            )}
          </div>

          {/* MANAGEMENT */}
          <div className={styles.navGroup}>
            <div 
              className={`${styles.navItem} ${active === "management" ? styles.expanded : ""}`} 
              onClick={() => toggleMenu("management")}
            >
              <FaCog className={styles.navIcon} />
              <span>Management</span>
              <span className={styles.arrow}>
                {active === "management" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </div>
            {active === "management" && (
              <div className={styles.subMenu}>
                <p onClick={() => handleNavigate("/chart-of-accounts")}>📊 Chart of Accounts</p>
                <p onClick={() => handleNavigate("/add-edit-items")}>✏️ Add/Edit Items</p>
                <p onClick={() => handleNavigate("/branch-management")}>🏢 Branch Management</p>
                <p onClick={() => handleNavigate("/karigar-rates")}>💰 Karigar Rates</p>
                <p onClick={() => handleNavigate("/designs")}>🎨 Designs</p>
                <p onClick={() => handleNavigate("/extra-stitches")}>🧩 Extra Stitch</p>
                <p onClick={() => handleNavigate("/change-password")}>🔑 Change Password</p>
                <p onClick={() => handleNavigate("/user-management")}>👥 User Management</p>
                <p onClick={() => handleNavigate("/user-authorization")}>🛡️ User Authorization</p>
                <p onClick={() => handleNavigate("/settings")}>⚙️ Settings</p>
              </div>
            )}
          </div>
        </nav>

        <div className={styles.divider}></div>

        {/* Footer / Logout */}
        <div className={styles.footer}>
          <div className={styles.navItem} onClick={() => navigate("/login")}>
            <FaSignOutAlt className={styles.navIcon} />
            <span>Logout</span>
          </div>
          <div className={styles.version}>v2.0.0</div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;