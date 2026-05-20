import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CashActivity.module.css";

function CashActivity() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_date: "",
    to_date: ""
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!report.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!report.to_date) {
      alert("Please select To Date");
      return;
    }
    if (report.from_date > report.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Cash Activity Report:", report);
    setLoading(true);
    
    try {
      // API call here
      // const response = await axios.get("/api/cash-activity", { params: report });
      // setReportData(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setReportData({
          opening_balance: 25000,
          total_cash_in: 45000,
          total_cash_out: 28000,
          closing_balance: 42000,
          transactions: [
            { date: "2026-05-01", description: "Customer Payment", amount: 15000, type: "in" },
            { date: "2026-05-03", description: "Supplier Payment", amount: 8000, type: "out" },
            { date: "2026-05-05", description: "Customer Payment", amount: 20000, type: "in" },
            { date: "2026-05-08", description: "Utility Bills", amount: 5000, type: "out" },
            { date: "2026-05-10", description: "Customer Payment", amount: 10000, type: "in" },
            { date: "2026-05-12", description: "Salary Payment", amount: 15000, type: "out" }
          ]
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching cash activity report");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport({
      from_date: "",
      to_date: ""
    });
    setReportData(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cash Activity Report</h1>
          <p className={styles.subtitle}>Track cash inflow and outflow</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={report.from_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={report.to_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Loading..." : "💰 Generate Report"}
            </button>
          </div>
        </form>

        {/* Selected Period Summary */}
        {(report.from_date || report.to_date) && (
          <div className={styles.periodCard}>
            <div className={styles.periodIcon}>📅</div>
            <div className={styles.periodContent}>
              <span className={styles.periodLabel}>Selected Period</span>
              <span className={styles.periodDate}>
                {report.from_date || "Start"} → {report.to_date || "End"}
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching cash activity data...</p>
          </div>
        )}

        {/* Report Results */}
        {reportData && !loading && (
          <div className={styles.results}>
            {/* Summary Cards */}
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Opening Balance</span>
                  <span className={styles.openingBalance}>{formatCurrency(reportData.opening_balance)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📥</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Cash Inflow</span>
                  <span className={styles.cashIn}>{formatCurrency(reportData.total_cash_in)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📤</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Cash Outflow</span>
                  <span className={styles.cashOut}>{formatCurrency(reportData.total_cash_out)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>🏦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Closing Balance</span>
                  <span className={styles.closingBalance}>{formatCurrency(reportData.closing_balance)}</span>
                </div>
              </div>
            </div>

            {/* Net Cash Flow */}
            <div className={styles.netCashCard}>
              <div className={styles.netCashIcon}>📊</div>
              <div className={styles.netCashContent}>
                <span className={styles.netCashLabel}>Net Cash Flow</span>
                <span className={reportData.total_cash_in - reportData.total_cash_out >= 0 ? styles.positiveFlow : styles.negativeFlow}>
                  {formatCurrency(reportData.total_cash_in - reportData.total_cash_out)}
                </span>
              </div>
            </div>

            {/* Transactions Table */}
            <div className={styles.transactionsSection}>
              <h3 className={styles.sectionTitle}>Transaction Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.transactions.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td>
                          <span className={item.type === "in" ? styles.inflowBadge : styles.outflowBadge}>
                            {item.type === "in" ? "📥 Cash In" : "📤 Cash Out"}
                          </span>
                        </td>
                        <td className={item.type === "in" ? styles.inflowAmount : styles.outflowAmount}>
                          {formatCurrency(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && !reportData && report.from_date && report.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>💰</div>
            <p>No cash activity found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default CashActivity;