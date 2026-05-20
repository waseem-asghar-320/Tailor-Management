import styles from './Invoice.module.css';
import { useNavigate } from "react-router-dom";

// 👇 import icons
import { MdShoppingCart, MdAssignmentReturn, MdInventory } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const data = [
  { title: "Add Invoice", icon: <IoIosAddCircleOutline />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Create new invoices" },
  { title: "Purchase", icon: <MdShoppingCart />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage purchases" },
  { title: "Purchase Return", icon: <MdAssignmentReturn />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Handle purchase returns" },
  { title: "Stock Adjustment", icon: <MdInventory />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Adjust inventory stock" },
];

function Invoice() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Purchase") navigate("/purchase-form");
    else if (title === "Add Invoice") navigate("/add-invoice-form");
    else if (title === "Purchase Return") navigate("/purchase-return-form");
    else if (title === "Stock Adjustment") navigate("/stock-adjustment-form");
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
            <div className={styles.headerIcon}>📄</div>
            <div>
              <h1 className={styles.mainTitle}>Invoices</h1>
              <p className={styles.subtitle}>Manage invoices, purchases and inventory</p>
            </div>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{data.length}</span>
              <span className={styles.statLabel}>Modules</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>Active</span>
              <span className={styles.statLabel}>System Online</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {data.map((item, index) => (
            <div 
              key={index} 
              className={styles.card} 
              onClick={() => handleClick(item.title)}
              style={{ animationDelay: `${index * 0.1}s` }}
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

export default Invoice;