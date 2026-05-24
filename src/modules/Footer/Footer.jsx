import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Tailor Soft. All rights reserved.</p>
    </footer>
  );
}

export default Footer;