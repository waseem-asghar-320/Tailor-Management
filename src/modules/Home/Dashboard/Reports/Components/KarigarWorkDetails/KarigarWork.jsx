import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./KarigarWork.module.css";

function KarigarWork() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    from_receiving_date: "",
    to_receiving_date: "",
    karigar_id: "",
    output_format: "PDF"
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
    if (!report.from_receiving_date) {
      alert("Please select From Receiving Date");
      return;
    }
    if (!report.to_receiving_date) {
      alert("Please select To Receiving Date");
      return;
    }
    if (report.from_receiving_date > report.to_receiving_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    if (!report.karigar_id) {
      alert("Please enter Karigar ID");
      return;
    }
    
    console.log("Karigar Work Details:", report);
    setLoading(true);
    
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/karigar-work-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(report)
        }
      );

      const data = await response.json();
      console.log(data);
      setReportData(data);
      alert("Report generated successfully!");
      
    } catch (error) {
      console.log(error);
      alert("Error generating report");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport({
      from_receiving_date: "",
      to_receiving_date: "",
      karigar_id: "",
      output_format: "PDF"
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

  // Sample data for demonstration
  const workDetails = [
    { id: 1, date: "2026-05-01", item_name: "Shirt", qty: 10, rate: 150, amount: 1500, status: "Completed" },
    { id: 2, date: "2026-05-03", item_name: "Pant", qty: 5, rate: 200, amount: 1000, status: "Completed" },
    { id: 3, date: "2026-05-05", item_name: "Shalwar Kameez", qty: 3, rate: 500, amount: 1500, status: "In Progress" },
    { id: 4, date: "2026-05-08", item_name: "Shirt", qty: 8, rate: 150, amount: 1200, status: "Completed" }
  ];

  const totalItems = workDetails.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = workDetails.reduce((sum, item) => sum + item.amount, 0);
  const completedItems = workDetails.filter(item => item.status === "Completed").reduce((sum, item) => sum + item.qty, 0);
  const pendingItems = workDetails.filter(item => item.status === "In Progress").reduce((sum, item) => sum + item.qty, 0);

  const showResults = reportData || (report.from_receiving_date && report.to_receiving_date && report.karigar_id);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Karigar Work Details</h1>
          <p className={styles.subtitle}>Track work assigned to karigars and their progress</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>From Receiving Date *</label>
              <input
                type="date"
                name="from_receiving_date"
                value={report.from_receiving_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>To Receiving Date *</label>
              <input
                type="date"
                name="to_receiving_date"
                value={report.to_receiving_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Karigar ID *</label>
              <input
                type="number"
                name="karigar_id"
                value={report.karigar_id}
                onChange={handleChange}
                placeholder="Enter Karigar ID"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Output Format *</label>
              <select name="output_format" value={report.output_format} onChange={handleChange} required>
                <option value="PDF">📄 PDF Document</option>
                <option value="Excel">📊 Excel Sheet</option>
                <option value="Print">🖨️ Print</option>
              </select>
            </div>
          </div>

          <div className={styles.filterCard}>
            <div className={styles.filterIcon}>👨‍🔧</div>
            <div className={styles.filterContent}>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Karigar ID</span>
                <span className={styles.filterValue}>{report.karigar_id || "—"}</span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Period</span>
                <span className={styles.filterValue}>
                  {formatDate(report.from_receiving_date) || "Start"} → {formatDate(report.to_receiving_date) || "End"}
                </span>
              </div>
              <div className={styles.filterDivider}></div>
              <div className={styles.filterItem}>
                <span className={styles.filterLabel}>Output</span>
                <span className={styles.filterValue}>{report.output_format}</span>
              </div>
            </div>
            <div className={styles.formatBadge}>
              {report.output_format === "PDF" && "📄"}
              {report.output_format === "Excel" && "📊"}
              {report.output_format === "Print" && "🖨️"}
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
            <p>Generating karigar work details...</p>
          </div>
        )}

        {!loading && showResults && (
          <div className={styles.results}>
            <div className={styles.summaryCards}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Items</span>
                  <span className={styles.totalItems}>{totalItems} pcs</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Total Amount</span>
                  <span className={styles.totalAmount}>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>✅</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>Completed</span>
                  <span className={styles.completedItems}>{completedItems} pcs</span>
                </div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryIcon}>⏳</div>
                <div className={styles.summaryInfo}>
                  <span className={styles.summaryLabel}>In Progress</span>
                  <span className={styles.pendingItems}>{pendingItems} pcs</span>
                </div>
              </div>
            </div>

            <div className={styles.tableSection}>
              <h3 className={styles.sectionTitle}>Work Details</h3>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Rate (₨)</th>
                      <th>Amount (₨)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workDetails.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>{item.item_name}</td>
                        <td className={styles.qtyCell}>{item.qty} pcs</td>
                        <td>{formatCurrency(item.rate)}</td>
                        <td className={styles.amountCell}>{formatCurrency(item.amount)}</td>
                        <td>
                          <span className={item.status === "Completed" ? styles.completedBadge : styles.progressBadge}>
                            {item.status === "Completed" ? "✅ Completed" : "🔄 In Progress"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className={styles.footerRow}>
                      <td colSpan="3" className={styles.footerLabel}>Total</td>
                      <td className={styles.footerQty}>{totalItems} pcs</td>
                      <td></td>
                      <td className={styles.footerAmount}>{formatCurrency(totalAmount)}</td>
                      <td></td>
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
                📥 Download {report.output_format}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KarigarWork;