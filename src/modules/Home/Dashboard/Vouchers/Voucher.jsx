import styles from './Voucher.module.css';
import { useNavigate } from "react-router-dom";

// 👇 import icons
import { FaEnvelopeOpenText, FaWallet, FaUniversity, FaHandHoldingUsd } from "react-icons/fa";

const data = [
  { title: "Voucher", icon: <FaEnvelopeOpenText />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Create and manage vouchers" },
  { title: "Petty Cash", icon: <FaWallet />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Petty cash management" },
  { title: "Bank Payment", icon: <FaUniversity />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Bank payment transactions" },
  { title: "Bank Receipt", icon: <FaHandHoldingUsd />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Bank receipt management" },
];

function Voucher() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Petty Cash") navigate("/petty-cash-form");
    else if (title === "Voucher") navigate("/voucher-form");
    else if (title === "Bank Payment") navigate("/bank-payment-form");
    else if (title === "Bank Receipt") navigate("/bank-receipt-form");
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
            <div className={styles.headerIcon}>📋</div>
            <div>
              <h1 className={styles.mainTitle}>Vouchers</h1>
              <p className={styles.subtitle}>Manage vouchers, petty cash and bank transactions</p>
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
              <span className={styles.statLabel}>Financial</span>
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

export default Voucher;