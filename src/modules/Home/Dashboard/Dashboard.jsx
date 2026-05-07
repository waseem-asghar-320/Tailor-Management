import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar"; // adjust path if needed

import Customers from "./Customers/Customers";
import Production from "./Production/Production";
import Invoice from "./Invoices/Invoice";
import Voucher from "./Vouchers/Voucher";
import Report from "./Reports/Report";
import Management from "./Management/Management";

import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div>
      <h1 className={styles.heading}>Dashboard</h1>

      <Customers />
      <Production />
      <Invoice />
      <Voucher />
      <Report />
      <Management />
    </div>
  );
}

export default Dashboard;