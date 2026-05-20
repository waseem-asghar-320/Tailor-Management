import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BankBook.module.css";

function BankBook() {
  const navigate = useNavigate();
  const [bankBook, setBankBook] = useState({
    from_date: "",
    to_date: ""
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setBankBook({
      ...bankBook,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!bankBook.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!bankBook.to_date) {
      alert("Please select To Date");
      return;
    }
    if (bankBook.from_date > bankBook.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Bank Book Report:", bankBook);
    setLoading(true);
    
    try {
      // API call here
      // const response = await axios.get("/api/bank-book", { params: bankBook });
      // setReportData(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setReportData({
          opening_balance: 50000,
          total_deposits: 25000,
          total_withdrawals: 15000,
          closing_balance: 60000,
          transactions: [
            { date: "2026-05-01", description: "Deposit", amount: 10000, type: "credit" },
            { date: "2026-05-05", description: "Withdrawal", amount: 5000, type: "debit" },
            { date: "2026-05-10", description: "Deposit", amount: 15000, type: "credit" },
            { date: "2026-05-15", description: "Withdrawal", amount: 10000, type: "debit" }
          ]
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching bank book report");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBankBook({
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
          <h1 className={styles.title}>Bank Book Report</h1>
          <p className={styles.subtitle}>View bank transaction summary</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={bankBook.from_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={bankBook.to_date}
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
              {loading ? "Loading..." : "📊 View Bank Book"}
            </button>
          </div>
        </form>

        {/* Selected Duration Summary */}
        {(bankBook.from_date || bankBook.to_date) && (
          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}>📅</div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Selected Duration</span>
              <span className={styles.summaryDate}>
                {bankBook.from_date || "Start"} → {bankBook.to_date || "End"}
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching bank book data...</p>
          </div>
        )}

        {/* Report Results */}
        {reportData && !loading && (
          <div className={styles.results}>
            {/* Summary Cards */}
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryItemIcon}>💰</div>
                <div className={styles.summaryItemContent}>
                  <span className={styles.summaryItemLabel}>Opening Balance</span>
                  <span className={styles.openingBalance}>{formatCurrency(reportData.opening_balance)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryItemIcon}>📥</div>
                <div className={styles.summaryItemContent}>
                  <span className={styles.summaryItemLabel}>Total Deposits</span>
                  <span className={styles.depositAmount}>{formatCurrency(reportData.total_deposits)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryItemIcon}>📤</div>
                <div className={styles.summaryItemContent}>
                  <span className={styles.summaryItemLabel}>Total Withdrawals</span>
                  <span className={styles.withdrawalAmount}>{formatCurrency(reportData.total_withdrawals)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryItemIcon}>🏦</div>
                <div className={styles.summaryItemContent}>
                  <span className={styles.summaryItemLabel}>Closing Balance</span>
                  <span className={styles.closingBalance}>{formatCurrency(reportData.closing_balance)}</span>
                </div>
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
                          <span className={item.type === "credit" ? styles.creditBadge : styles.debitBadge}>
                            {item.type === "credit" ? "📥 Deposit" : "📤 Withdrawal"}
                          </span>
                        </td>
                        <td className={item.type === "credit" ? styles.creditAmount : styles.debitAmount}>
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
        {!loading && !reportData && bankBook.from_date && bankBook.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🏦</div>
            <p>No bank transactions found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default BankBook;