import React from "react";
import { useState } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import styles from "./Header.module.css";


function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Top bar */}
      <div className={styles.navbar}>
        <button onClick={() => setOpen(true)} className={styles.menuBtn}>
          ☰
        </button>
        <h4 className={styles.logout}>
          <i class="fa-solid fa-power-off"></i>
          Log Out</h4>
      </div>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />


      
  
    </div>
  );
}



export default Header;