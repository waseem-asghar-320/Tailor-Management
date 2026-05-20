import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Ledger.module.css";

function Ledger() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    transaction_date: "",
    account_id: "",
    options: "Detail"
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.transaction_date) {
      alert("Please select transaction date");
      return;
    }
    if (!form.account_id) {
      alert("Please enter account ID");
      return;
    }
    
    console.log("Transaction Report:", form);
    setLoading(true);
    
    try {
      // API call here
      // const response = await axios.post("/api/transaction-report", form);
      // setReportData(response.data);
      
      // Simulate API call
      setTimeout(() => {
        setReportData({
          account_id: form.account_id,
          transaction_date: form.transaction_date,
          report_type: form.options,
          opening_balance: 50000,
          closing_balance: 75000,
          transactions: [
            { date: "2026-05-01", description: "Opening Balance", debit: 0, credit: 50000, balance: 50000 },
            { date: "2026-05-03", description: "Customer Payment", debit: 15000, credit: 0, balance: 65000 },
            { date: "2026-05-05", description: "Supplier Payment", debit: 0, credit: 10000, balance: 55000 },
            { date: "2026-05-08", description: "Sales Revenue", debit: 20000, credit: 0, balance: 75000 }
          ]
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error generating report");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      transaction_date: "",
      account_id: "",
      options: "Detail"
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

  const showResults = reportData || (form.transaction_date && form.account_id);

  // Sample transaction data for summary view
  const summaryData = [
    { type: "Debit Transactions", count: 12, amount: 125000 },
    { type: "Credit Transactions", count: 8, amount: 85000 },
    { type: "Net Balance", count: 0, amount: 40000 }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Transaction Report</h1>
          <p className={styles.subtitle}>View detailed transaction history and account statements</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Transaction Date *</label>
              <input
                type="date"
                name="transaction_date"
                value={form.transaction_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Account ID *</label>
              <input
                type="number"
                name="account_id"
                value={form.account_id}
                onChange={handleChange}
                placeholder="Enter account ID"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Report Type</label>
              <select name="options" value={form.options} onChange={handleChange}>
                <option value="Detail">📋 Detail</option>
                <option value="Summary">📊 Summary</option>
              </select>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>📒</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Account ID</span>
                <span className={styles.filterValue}>{form.account_id || "—"}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Transaction Date</span>
                <span className={styles.filterValue}>{formatDate(form.transaction_date) || "—"}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Report Type</span>
                <span className={styles.filterValue}>{form.options}</span>
              </div>
            </div>
            <div className={styles.formatBadge}>
              {form.options === "Detail" ? "📋" : "📊"} {form.options}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Generating..." : "📊 Generate Report"}
            </button>
          </div>
        </form>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Generating transaction report...</p>
          </div>
        )}

        {!loading && showResults && form.options === "Detail" && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Opening Balance</span>
                  <span className={styles.openingBalance}>{formatCurrency(50000)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📥</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Debit</span>
                  <span className={styles.debitAmount}>{formatCurrency(35000)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📤</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Credit</span>
                  <span className={styles.creditAmount}>{formatCurrency(10000)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>🏦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Closing Balance</span>
                  <span className={styles.closingBalance}>{formatCurrency(75000)}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Transaction Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Debit (₨)</th>
                      <th>Credit (₨)</th>
                      <th>Balance (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                    {reportData?.transactions?.map((item, index) => (
                       <table>
                      <tr key={index}>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.description}</td>
                        <td className={item.debit > 0 ? styles.debitAmount : ""}>
                          {item.debit > 0 ? formatCurrency(item.debit) : "-"}
                        </td>
                        <td className={item.credit > 0 ? styles.creditAmount : ""}>
                          {item.credit > 0 ? formatCurrency(item.credit) : "-"}
                        </td>
                        <td className={styles.balanceAmount}>{formatCurrency(item.balance)}</td>
                        </tr>
                      </table>
                      
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="2" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerDebit}>{formatCurrency(35000)}</td>
                      <td className={styles.footerCredit}>{formatCurrency(10000)}</td>
                      <td className={styles.footerBalance}>{formatCurrency(75000)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
              <button className={styles.downloadBtn}>
                📥 Download PDF
              </button>
            </div>
          </div>
        )}

        {!loading && showResults && form.options === "Summary" && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📋</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Transactions</span>
                  <span className={styles.totalTransactions}>20</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📥</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Debit</span>
                  <span className={styles.debitAmount}>{formatCurrency(125000)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📤</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Credit</span>
                  <span className={styles.creditAmount}>{formatCurrency(85000)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>🏦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Net Balance</span>
                  <span className={styles.netBalance}>{formatCurrency(40000)}</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Transaction Summary</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Transaction Type</th>
                      <th>Count</th>
                      <th>Total Amount (₨)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryData.map((item, index) => (
                      <tr key={index}>
                        <td className={styles.typeCell}>{item.type}</td>
                        <td className={styles.countCell}>{item.count > 0 ? item.count : "-"}</td>
                        <td className={item.type === "Net Balance" ? styles.netCell : styles.amountCell}>
                          {item.amount > 0 ? formatCurrency(item.amount) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.printBtn} onClick={() => window.print()}>
                🖨️ Print Report
              </button>
              <button className={styles.downloadBtn}>
                📥 Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ledger;