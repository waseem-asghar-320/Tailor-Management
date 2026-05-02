import React from "react";
import { useState } from "react";
import Customers from "./Customers/Customers";
import Header from "./Header/Header";
import Production from "./Production/Production";
import Invoice from "./Invoices/Invoice";
import Voucher from "./Vouchers/Voucher";
import Report from "./Reports/Report";
import Management from "./Management/Management";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header />
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