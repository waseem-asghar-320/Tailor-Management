import { useState } from "react";
import styles from "./UnpaidDelivery.module.css";

function UnpaidDelivery() {
  const [filters, setFilters] = useState({
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [unpaidDeliveries, setUnpaidDeliveries] = useState([]);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!filters.from_date) {
      alert("Please select From Date");
      return;
    }
    if (!filters.to_date) {
      alert("Please select To Date");
      return;
    }
    if (filters.from_date > filters.to_date) {
      alert("From Date cannot be greater than To Date");
      return;
    }
    
    console.log("Filters:", filters);
    setLoading(true);
    
    try {
      // API CALL HERE
      // const response = await axios.get("/api/unpaid-deliveries", { params: filters });
      // setUnpaidDeliveries(response.data);
      
      // Simulate API call with dummy data
      setTimeout(() => {
        const dummyUnpaidDeliveries = [
          { 
            id: 1, 
            customer_name: "Ahmed Raza", 
            phone: "03001234567", 
            address: "House #123, Main Boulevard, Gulberg, Lahore",
            delivery_date: filters.from_date,
            total_amount: 3500,
            paid_amount: 1000,
            balance: 2500,
            status: "overdue",
            days_overdue: 15
          },
          { 
            id: 2, 
            customer_name: "Fatima Khan", 
            phone: "03119876543", 
            address: "Street 5, Phase 2, DHA, Karachi",
            delivery_date: filters.to_date,
            total_amount: 5200,
            paid_amount: 2000,
            balance: 3200,
            status: "pending",
            days_overdue: 5
          },
          { 
            id: 3, 
            customer_name: "Usman Ali", 
            phone: "03451234567", 
            address: "Shop #45, City Center, Rawalpindi",
            delivery_date: filters.from_date,
            total_amount: 2800,
            paid_amount: 0,
            balance: 2800,
            status: "critical",
            days_overdue: 30
          },
          { 
            id: 4, 
            customer_name: "Sara Khan", 
            phone: "03331234567", 
            address: "House #78, Defence Phase 3, Lahore",
            delivery_date: filters.to_date,
            total_amount: 6800,
            paid_amount: 3000,
            balance: 3800,
            status: "pending",
            days_overdue: 8
          }
        ];
        setUnpaidDeliveries(dummyUnpaidDeliveries);
        const total = dummyUnpaidDeliveries.reduce((sum, item) => sum + item.balance, 0);
        setTotalUnpaid(total);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching unpaid deliveries");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      from_date: new Date().toISOString().split('T')[0],
      to_date: new Date().toISOString().split('T')[0]
    });
    setUnpaidDeliveries([]);
    setTotalUnpaid(0);
  };

  const getStatusBadge = (status, days) => {
    if (status === "overdue") {
      return <span className={`${styles.status} ${styles.overdue}`}>⚠️ Overdue ({days} days)</span>;
    } else if (status === "critical") {
      return <span className={`${styles.status} ${styles.critical}`}>🔴 Critical ({days} days)</span>;
    } else {
      return <span className={`${styles.status} ${styles.pending}`}>⏳ Pending ({days} days)</span>;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Unpaid Deliveries</h2>
          <p className={styles.subtitle}>Track and manage pending payment deliveries</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            {/* FROM DATE */}
            <div className={styles.field}>
              <label>From Date *</label>
              <input
                type="date"
                name="from_date"
                value={filters.from_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* TO DATE */}
            <div className={styles.field}>
              <label>To Date *</label>
              <input
                type="date"
                name="to_date"
                value={filters.to_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className={styles.buttons}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Loading..." : "💰 Generate Report"}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {unpaidDeliveries.length > 0 && (
          <div className={styles.results}>
            {/* Summary Cards */}
            <div className={styles.summaryCards}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>📦</div>
                <div className={styles.summaryContent}>
                  <h4>Total Unpaid Orders</h4>
                  <p>{unpaidDeliveries.length}</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>💰</div>
                <div className={styles.summaryContent}>
                  <h4>Total Outstanding Amount</h4>
                  <p className={styles.totalAmount}>{formatCurrency(totalUnpaid)}</p>
                </div>
              </div>
              <div className={styles.summaryCard}>
                <div className={styles.summaryIcon}>⚠️</div>
                <div className={styles.summaryContent}>
                  <h4>Critical Overdue</h4>
                  <p>{unpaidDeliveries.filter(d => d.status === "critical").length}</p>
                </div>
              </div>
            </div>

            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Unpaid Delivery Orders</h3>
              <span className={styles.resultCount}>{unpaidDeliveries.length} orders pending payment</span>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Balance Due</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidDeliveries.map((delivery) => (
                    <tr key={delivery.id} className={delivery.status === "critical" ? styles.criticalRow : ""}>
                      <td>#{delivery.id}</td>
                      <td><strong>{delivery.customer_name}</strong></td>
                      <td>{delivery.phone}</td>
                      <td className={styles.addressCell}>{delivery.address}</td>
                      <td>{delivery.delivery_date}</td>
                      <td className={styles.amountCell}>{formatCurrency(delivery.total_amount)}</td>
                      <td className={styles.paidCell}>{formatCurrency(delivery.paid_amount)}</td>
                      <td className={styles.balanceCell}>{formatCurrency(delivery.balance)}</td>
                      <td>{getStatusBadge(delivery.status, delivery.days_overdue)}</td>
                      <td>
                        <button className={styles.viewBtn} title="View Details">
                          👁️
                        </button>
                        <button className={styles.remindBtn} title="Send Reminder">
                          📧
                        </button>
                        <button className={styles.paymentBtn} title="Record Payment">
                          💵
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className={styles.footerRow}>
                    <td colSpan="7" className={styles.footerLabel}>Total Outstanding:</td>
                    <td className={styles.footerTotal}>{formatCurrency(totalUnpaid)}</td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && unpaidDeliveries.length === 0 && filters.from_date && filters.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>✅</div>
            <p>No unpaid deliveries found</p>
            <small>All deliveries in this date range have been paid</small>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching unpaid deliveries...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnpaidDelivery;