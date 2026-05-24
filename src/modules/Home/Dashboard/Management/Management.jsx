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
  { title: "Chart of Accounts", icon: <FaSitemap />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage account structure" },
  { title: "Add/Edit Items", icon: <FaPlusSquare />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage inventory items" },
  { title: "Branch Management", icon: <FaCodeBranch />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Multi-branch settings" },
  { title: "Karigar Rates", icon: <FaTools />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Worker rate management" },
  { title: "Designs", icon: <FaPalette />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Design catalog" },
  { title: "Extra Stitches", icon: <FaPuzzlePiece />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Additional items" },
  { title: "Change Password", icon: <FaKey />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Update your password" },
  { title: "User Management", icon: <FaUsers />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage system users" },
  { title: "User Authorization", icon: <FaUserShield />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Role permissions" },
  { title: "Settings", icon: <FaCog />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "System configuration" },
];

function Management() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const routes = {
      "Chart of Accounts": "/chart-of-accounts",
      "Add/Edit Items": "/add-edit-items",
      "Branch Management": "/branch-management",
      "Karigar Rates": "/karigar-rates",
      "Designs": "/designs",
      "Extra Stitches": "/extra-stitches",
      "Change Password": "/change-password",
      "User Management": "/user-management",
      "User Authorization": "/user-authorization",
      "Settings": "/settings"
    };
    navigate(routes[title]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>⚙️</div>
            <div>
              <h1 className={styles.mainTitle}>Management</h1>
              <p className={styles.subtitle}>System administration and configuration</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{data.length}</span>
              <span className={styles.statLabel}>Modules</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Admin</span>
              <span className={styles.statLabel}>Access</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={styles.card} 
              onClick={() => handleClick(item.title)}
              style={{ animationDelay: `${Math.min(index * 0.03, 0.5)}s` }}
            >
              <div className={styles.cardGlow}></div>
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper} style={{ background: item.bg }}>
                  <div className={styles.icon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.cardArrow}>→</div>
              </div>
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Management;