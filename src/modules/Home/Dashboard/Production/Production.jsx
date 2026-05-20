import styles from './Production.module.css';
import { useNavigate } from "react-router-dom";

// 👇 import icons
import { GiSewingMachine, GiReceiveMoney } from "react-icons/gi";
import { IoCut } from "react-icons/io5";
import { MdCallReceived } from "react-icons/md";

const data = [
  { title: "Karigar", icon: <GiSewingMachine />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Manage karigar workers" },
  { title: "Cutting", icon: <IoCut />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Cutting management" },
  { title: "Karigar Receiving", icon: <GiReceiveMoney />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Receive from karigar" },
  { title: "Cutting Receiving", icon: <MdCallReceived />, color: "#ffa600", bg: "linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%)", description: "Receive cutting work" },
];

function Production() {
  const navigate = useNavigate();

  const handleClick = (title) => {
    if (title === "Karigar") navigate("/karigar-form");
    else if (title === "Cutting") navigate("/cutting-form");
    else if (title === "Karigar Receiving") navigate("/karigar-receiving-form");
    else if (title === "Cutting Receiving") navigate("/cutting-receiving-form");
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
            <div className={styles.headerIcon}>🪡</div>
            <div>
              <h1 className={styles.mainTitle}>Production</h1>
              <p className={styles.subtitle}>Manage karigar, cutting and receiving operations</p>
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
              <span className={styles.statLabel}>Production</span>
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

export default Production;