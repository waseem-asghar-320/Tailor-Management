import { useState } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../Header/Header";
import ScrollToTop from "../Scroll-to-top/ScrollToTop";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sidebar open={open} setOpen={setOpen} />
      <Header open={open} setOpen={setOpen} />
      <ScrollToTop />
      <div
        style={{
          marginLeft: open ? "250px" : "0px",
          transition: "0.3s"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;