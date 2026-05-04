import React from "react";
import styles from "./Header.module.css";

function Header({ setOpen, open }) {
  return (
    <div>
      {/* Top bar */}
      <div className={styles.navbar} style={{left: open ? "250px" : "0px",
        width: open ? "calc(100% - 250px)" : "100%",}}>
        <div>
          <button onClick={() => setOpen(true)} className={styles.menuBtn}>
          ☰
          </button>
        </div>
        <div>
          <h4 className={styles.logout}>
            <i className="fa-solid fa-power-off"></i>
            Log Out
          </h4>
        </div>
      </div>

    </div>
  );
}

export default Header;