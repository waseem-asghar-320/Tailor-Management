import styles from './Management.module.css';
import { useNavigate } from "react-router-dom";
// 👇 import icons

import {
  FaSitemap,
  FaPlusSquare,
  FaCodeBranch,
  FaTools,
  FaPalette,
  FaPuzzlePiece,
  FaKey,
  FaUsers,
  FaUserShield,
  FaCog
} from "react-icons/fa";



const data = [
  { title:"Chart of Accounts", icon:<FaSitemap/>, color:"#6366f1", bg:"#c7d2fe" },
  { title:"Add/Edit Items", icon:<FaPlusSquare/>, color:"#22c55e", bg:"#bbf7d0" },
  { title:"Branch Management", icon:<FaCodeBranch/>, color:"#0ea5e9", bg:"#bae6fd" },
  { title:"Karigar Rates", icon:<FaTools/>, color:"#f97316", bg:"#fed7aa" },
  { title:"Designs", icon:<FaPalette/>, color:"#a855f7", bg:"#e9d5ff" },
  { title:"Extras", icon:<FaPuzzlePiece/>, color:"#14b8a6", bg:"#99f6e4" },
  { title:"Change Password", icon:<FaKey/>, color:"#ef4444", bg:"#fecaca" },
  { title:"User Management", icon:<FaUsers/>, color:"#3b82f6", bg:"#bfdbfe" },
  { title:"User Authorization", icon:<FaUserShield/>, color:"#8b5cf6", bg:"#ddd6fe" },
  { title:"Settings", icon:<FaCog/>, color:"#64748b", bg:"#e2e8f0" },
];

function Management() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Chart of Accounts") navigate("/chart-of-accounts");
    else if (title === "Add/Edit Items") navigate("/add-edit-items");
    else if (title === "Branch Management") navigate("/branch-management");
    else if (title === "Karigar Rates") navigate("/karigar-rates");
    else if (title === "Designs") navigate("/designs");
    else if (title === "Extras") navigate("/extras");
    else if (title === "Change Password") navigate("/change-password");
    else if (title === "User Management") navigate("/user-management");
    else if (title === "User Authorization") navigate("/user-authorization");
    else if (title === "Settings") navigate("/settings");
  };

  return (
    <>
      <h2 className={styles.heading}>Management</h2>

      <div className={styles.container}>
        
        <div className={styles.grid}>
          {data.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleClick(item.title)}
              style={{ cursor: "pointer",backgroundColor: item.bg}}
            >
              {/* 👇 ICON instead of IMG */}
              {/* <div className={styles.icon}>{item.icon}</div> */}

              <div
              className={styles.icon}
              style={{
                color: item.color,
                backgroundColor: item.bg,
              }}
            >
              {item.icon}
            </div>

              <p style={{ color: item.color }}>
              {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Management;