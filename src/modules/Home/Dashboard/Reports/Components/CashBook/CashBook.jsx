import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CashBook.module.css";

function CashBook() {
  const navigate = useNavigate();
  const [cashBook, setCashBook] = useState({
    from_date: "",
    to_date: ""
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setCashBook({
      ...cashBook,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!cashBook.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!cashBook.to_date) {
      alert("Please select To Date");
      return;
    }
    if (cashBook.from_date > cashBook.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Cash Book Report:", cashBook);
    setLoading(true);
    
    try {
      // API call here
      // const response = await axios.get("/api/cash-book", { params: cashBook });
      // setReportData(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setReportData({
          opening_balance: 35000,
          total_receipts: 52000,
          total_payments: 31000,
          closing_balance: 56000,
          transactions: [
            { date: "2026-05-01", description: "Opening Balance", amount: 35000, type: "receipt" },
            { date: "2026-05-02", description: "Customer Payment - Ahmed Raza", amount: 15000, type: "receipt" },
            { date: "2026-05-03", description: "Supplier Payment - Fabric Supplier", amount: 8000, type: "payment" },
            { date: "2026-05-05", description: "Customer Payment - Fatima Khan", amount: 20000, type: "receipt" },
            { date: "2026-05-07", description: "Utility Bills - Electricity", amount: 5000, type: "payment" },
            { date: "2026-05-08", description: "Salary Payment - Staff", amount: 12000, type: "payment" },
            { date: "2026-05-10", description: "Customer Payment - Usman Ali", amount: 12000, type: "receipt" },
            { date: "2026-05-12", description: "Office Expenses", amount: 6000, type: "payment" },
            { date: "2026-05-15", description: "Customer Payment - Sana Khan", amount: 5000, type: "receipt" }
          ]
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching cash book report");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCashBook({
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cash Book Report</h1>
          <p className={styles.subtitle}>View complete cash transaction history</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={cashBook.from_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={cashBook.to_date}
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
              {loading ? "Loading..." : "📒 View Cash Book"}
            </button>
          </div>
        </form>

        {/* Selected Period Summary */}
        {(cashBook.from_date || cashBook.to_date) && (
          <div className={styles.periodCard}>
            <div className={styles.periodIcon}>📅</div>
            <div className={styles.periodContent}>
              <span className={styles.periodLabel}>Selected Period</span>
              <span className={styles.periodDate}>
                {formatDate(cashBook.from_date) || "Start"} → {formatDate(cashBook.to_date) || "End"}
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching cash book data...</p>
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
                  <span className={styles.summaryLabel}>Total Receipts</span>
                  <span className={styles.receiptsAmount}>{formatCurrency(reportData.total_receipts)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📤</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Payments</span>
                  <span className={styles.paymentsAmount}>{formatCurrency(reportData.total_payments)}</span>
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
                <span className={reportData.total_receipts - reportData.total_payments >= 0 ? styles.positiveFlow : styles.negativeFlow}>
                  {formatCurrency(reportData.total_receipts - reportData.total_payments)}
                </span>
              </div>
            </div>

            {/* Running Balance Table */}
            <div className={styles.transactionsSection}>
              <h3 className={styles.sectionTitle}>Cash Book Entries</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      let runningBalance = reportData.opening_balance;
                      return reportData.transactions.map((item, index) => {
                        if (item.type === "receipt") {
                          runningBalance += item.amount;
                        } else if (item.type === "payment") {
                          runningBalance -= item.amount;
                        }
                        return (
                          <tr key={index}>
                            <td>{formatDate(item.date)}</td>
                            <td>{item.description}</td>
                            <td>
                              <span className={item.type === "receipt" ? styles.receiptBadge : styles.paymentBadge}>
                                {item.type === "receipt" ? "📥 Receipt" : "📤 Payment"}
                              </span>
                            </td>
                            <td className={item.type === "receipt" ? styles.receiptAmount : styles.paymentAmount}>
                              {formatCurrency(item.amount)}
                            </td>
                            <td className={styles.balanceAmount}>{formatCurrency(runningBalance)}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="4" className={styles.footerLabel}>Closing Balance</td>
                      <td className={styles.footerBalance}>{formatCurrency(reportData.closing_balance)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && !reportData && cashBook.from_date && cashBook.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📒</div>
            <p>No cash book entries found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default CashBook;