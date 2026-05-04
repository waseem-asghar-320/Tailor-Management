import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar"; // adjust path if needed

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
    <>
      <Sidebar open={open} setOpen={setOpen} />

      <div
        className={styles.main}
        style={{
          marginLeft: open ? "250px" : "0px",
          transition: "0.3s"
        }}
      >
       <Header setOpen={setOpen} open={open} />
       <div>
        <br /><br /><br />
        <h1 className={styles.heading}>Dashboard</h1>
       </div>


        <Customers />
        <Production />
        <Invoice />
        <Voucher />
        <Report />
        <Management />
      </div>
    </>
  );
}

export default Dashboard;