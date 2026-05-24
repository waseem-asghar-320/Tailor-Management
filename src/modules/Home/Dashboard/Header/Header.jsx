import React, { useState } from "react";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header({ setOpen, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get current user from localStorage (you can replace with your auth context)
  const currentUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Admin User",
    role: "Administrator",
    avatar: "👤"
  };

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-PK', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear user session
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate("/settings");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
  "/home": "Home",
  "/profile": "Profile",
  "/my-dashboard": "Dashboard",
  "/bookings": "Bookings",
  "/booking-form": "Bookings",
  "/deliveries": "Deliveries",
  "/delivery-form": "Deliveries",
  "/customers": "Customers",
  "/receipt-form": "Receipt",
  "/shalwaar-kameez-form": "Shalwaar Qameez",
  "/delivery-report": "Delivery Report",
  "/customer-ledger-form": "Customer Ledger",
  "/customer-balances-form": "Customer Balances",
  "/home-delivery-list-form": "Home Delivery List",
  "/unpaid-deliveries-form": "Unpaid Deliveries",
  "/find-bookings-form": "Find Bookings",
  "/report-form": "Issue Report",
  "/delivery-check-form": "Delivery Check",
  "/trial-check-form": "Trial Check",
  "/not-sent-to-karigar-form": "Not Sent to Karigar",
  "/karigar-work-summary-form": "Karigar Work Summary",
  "/add-edit-customers-form": "Add/Edit Customers",

  // production path

   "/karigar-form": "Karigar",
  "/cutting-form": "Cutting",
  "/karigar-receiving-form": "Karigar Receiving",
  "/cutting-receiving-form": "Cutting Receiving",

  //Invoice path


  "/purchase-form": "Purchase",
  "/add-invoice-form": "Add Invoice",
  "/purchase-return-form": "Purchase Return",
  "/stock-adjustment-form": "Stock Adjustment",

  //Voucher Path

  "/petty-cash-form": "Petty Cash",
  "/voucher-form": "Voucher",
  "/bank-payment-form": "Bank Payment",
  "/bank-receipt-form": "Bank Receipt",

  // Report Path


  "/ledger-form": "Ledger",
  "/cash-activity-form": "Cash Activity",
  "/cash-book-form": "Cash Book",
  "/bank-book-form": "Bank Book",
  "/expenses-summary-form": "Expenses Summary",
  "/karigar-work-detail-form": "Karigar Work Detail",
  "/sales": "Sales",
  "/profit-on-sale-form": "Profit On Sale",
  "/tax-report-form": "Tax Report",
  "/purchases-form": "Purchases",
  "/products-list-form": "Products List",
  "/chart-of-accounts-form": "Chart of Accounts",
  "/stock-report-form": "Stock Report",
  "/item-ledger-form": "Item Ledger",
  "/stock-adjustments-form": "Stock Adjustments",
  "/trial-balance-form": "Trial Balance",
  "/profit-loss-form": "Profit & Loss",

  // Managenet Path

  
  "/chart-of-accounts": "Chart of Accounts",
  "/add-edit-items": "Add/Edit Items",
  "/branch-management": "Branch Management",
  "/karigar-rates": "Karigar Rates",
  "/designs": "Designs",
  "/extras": "Extras",
  "/change-password": "Change Password",
  "/user-management": "User Management",
  "/user-authorization": "User Authorization",
  "/settings": "Settings",
  "/extra-stitches": "Extra Stitch",


};
    return titles[path] || "Management System";
  };

  return (
    <div id="home">
      {/* Top Navigation Bar */}
      <div 
        className={styles.navbar} 
        style={{
          left: open ? "280px" : "0px",
          width: open ? "calc(100% - 280px)" : "100%",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
        }}
      >
        <div className={styles.navLeft}>
          <button 
            onClick={() => setOpen(!open)} 
            className={styles.menuBtn}
            title={open ? "Close Menu" : "Open Menu"}
          >
            {open ? "✕" : "☰"}
          </button>
          
          <div className={styles.pageInfo}>
            <span className={styles.pageIcon}>
              {getPageTitle() === "Home" && "🏠"}
              {getPageTitle() === "Dashboard" && "📊"}
              {getPageTitle() === "Bookings" && "📅"}
              {getPageTitle() === "Deliveries" && "🚚"}
              {getPageTitle() === "Receipt" && "🧾"}
              {getPageTitle() === "Shalwaar Qameez" && "👕"}
              {getPageTitle() === "Delivery Report" && "📊"}
              {getPageTitle() === "Customer Ledger" && "📒"}
              {getPageTitle() === "Customer Balances" && "💰"}
              {getPageTitle() === "Home Delivery List" && "🏠"}
              {getPageTitle() === "Unpaid Deliveries" && "⚠️"}
              {getPageTitle() === "Find Bookings" && "🔍"}
              {getPageTitle() === "Issue Report" && "📋"}
              {getPageTitle() === "Delivery Check" && "✅"}
              {getPageTitle() === "Trial Check" && "📅"}
              {getPageTitle() === "Not Sent to Karigar" && "✂️"}
              {getPageTitle() === "Karigar Work Summary" && "👨‍🔧"}
              {getPageTitle() === "Add/Edit Customers" && "✏️"}

              {/* production path */}

              {getPageTitle() === "Karigar" && "👨‍🔧"}
              {getPageTitle() === "Cutting" && "✂️"}
              {getPageTitle() === "Karigar Receiving" && "📦"}
              {getPageTitle() === "Cutting Receiving" && "📦"}

              {/* Invoice path */}

              {getPageTitle() === "Purchase" && "🛒"}
              {getPageTitle() === "Add Invoice" && "📄"}
              {getPageTitle() === "Purchase Return" && "↩️"}
              {getPageTitle() === "Stock Adjustment" && "📦"}

              {/* voucher path */}

              {getPageTitle() === "Petty Cash" && "💰"}
              {getPageTitle() === "Voucher" && "📋"}
              {getPageTitle() === "Bank Payment" && "💳"}
              {getPageTitle() === "Bank Receipt" && "🏦"}

              {/* Reports path */}

              {getPageTitle() === "Ledger" && "📒"}
              {getPageTitle() === "Cash Activity" && "💰"}
              {getPageTitle() === "Cash Book" && "📕"}
              {getPageTitle() === "Bank Book" && "📘"}
              {getPageTitle() === "Expenses Summary" && "📊"}
              {getPageTitle() === "Karigar Work Detail" && "👨‍🔧"}
              {getPageTitle() === "Sales" && "📈"}
              {getPageTitle() === "Profit On Sale" && "💰"}
              {getPageTitle() === "Tax Report" && "📑"}
              {getPageTitle() === "Purchases" && "🛒"}
              {getPageTitle() === "Products List" && "📦"}
              {getPageTitle() === "Chart of Accounts" && "📊"}
              {getPageTitle() === "Stock Report" && "📦"}
              {getPageTitle() === "Item Ledger" && "📒"}
              {getPageTitle() === "Stock Adjustments" && "⚙️"}
              {getPageTitle() === "Trial Balance" && "⚖️"}
              {getPageTitle() === "Profit & Loss" && "📈"}

              {/* //Management path */}

              {/* {getPageTitle() === "Chart of Accounts" && "📊"} */}
              {getPageTitle() === "Add/Edit Items" && "📦"}
              {getPageTitle() === "Branch Management" && "🏢"}
              {getPageTitle() === "Karigar Rates" && "💰"}
              {getPageTitle() === "Designs" && "🎨"}
              {getPageTitle() === "Extras" && "🧩"}
              {getPageTitle() === "Change Password" && "🔑"}
              {getPageTitle() === "User Management" && "👥"}
              {getPageTitle() === "User Authorization" && "🛡️"}
              {getPageTitle() === "Settings" && "⚙️"}
               {getPageTitle() === "Extra Stitch" && "🧩"}
               {getPageTitle() === "Profile" && "👤"}
            </span>
            <h3 className={styles.pageTitle}>{getPageTitle()}</h3>
          </div>
        </div>

        <div className={styles.navRight}>
          {/* Date & Time */}
          <div className={styles.dateTime}>
            <div className={styles.dateIcon}>📅</div>
            <div className={styles.dateInfo}>
              <span className={styles.date}>{formatDate()}</span>
              <span className={styles.time}>{formatTime()}</span>
            </div>
          </div>

          {/* Notification Bell */}
          <button className={styles.notificationBtn} title="Notifications">
            <span className={styles.notificationIcon}>🔔</span>
            <span className={styles.notificationBadge}>3</span>
          </button>

          {/* User Profile Dropdown */}
          <div className={styles.userDropdown}>
            <button 
              className={styles.userBtn} 
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={styles.userAvatar}>
                {currentUser.avatar}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{currentUser.name}</span>
                <span className={styles.userRole}>{currentUser.role}</span>
              </div>
              <span className={styles.dropdownArrow}>▼</span>
            </button>

            {showUserMenu && (
              <>
                <div className={styles.dropdownOverlay} onClick={() => setShowUserMenu(false)}></div>
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownAvatar}>{currentUser.avatar}</div>
                    <div>
                      <div className={styles.dropdownName}>{currentUser.name}</div>
                      <div className={styles.dropdownRole}>{currentUser.role}</div>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={handleProfile} className={styles.dropdownItem}>
                    <span>👤</span> My Profile
                  </button>
                  <button onClick={handleSettings} className={styles.dropdownItem}>
                    <span>⚙️</span> Settings
                  </button>
                  <button onClick={() => {}} className={styles.dropdownItem}>
                    <span>❓</span> Help & Support
                  </button>
                  <div className={styles.dropdownDivider}></div>
                  <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Optional: Animated spacer */}
      <div className={styles.spacer}></div>
    </div>
  );
}

export default Header;