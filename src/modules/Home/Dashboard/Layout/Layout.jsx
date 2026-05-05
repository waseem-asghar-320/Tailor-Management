import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} />

      <div style={{ marginLeft: open ? "250px" : "0px" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;