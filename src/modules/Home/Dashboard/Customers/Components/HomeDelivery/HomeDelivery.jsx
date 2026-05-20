import { useState } from "react";
import styles from "./HomeDelivery.module.css";

function HomeDelivery() {
  const [filters, setFilters] = useState({
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

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
      // const response = await axios.get("/api/home-deliveries", { params: filters });
      // setDeliveries(response.data);
      
      // Simulate API call with dummy data
      setTimeout(() => {
        const dummyDeliveries = [
          { 
            id: 1, 
            customer_name: "Ahmed Raza", 
            phone: "03001234567", 
            address: "House #123, Main Boulevard, Gulberg, Lahore",
            delivery_date: filters.from_date,
            status: "pending",
            amount: 3500
          },
          { 
            id: 2, 
            customer_name: "Fatima Khan", 
            phone: "03119876543", 
            address: "Street 5, Phase 2, DHA, Karachi",
            delivery_date: filters.to_date,
            status: "delivered",
            amount: 5200
          },
          { 
            id: 3, 
            customer_name: "Usman Ali", 
            phone: "03451234567", 
            address: "Shop #45, City Center, Rawalpindi",
            delivery_date: filters.from_date,
            status: "in_transit",
            amount: 2800
          }
        ];
        setDeliveries(dummyDeliveries);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      alert("Error fetching deliveries");
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      from_date: new Date().toISOString().split('T')[0],
      to_date: new Date().toISOString().split('T')[0]
    });
    setDeliveries([]);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return <span className={`${styles.status} ${styles.delivered}`}>✅ Delivered</span>;
      case 'in_transit':
        return <span className={`${styles.status} ${styles.inTransit}`}>🚚 In Transit</span>;
      case 'pending':
        return <span className={`${styles.status} ${styles.pending}`}>⏳ Pending</span>;
      default:
        return <span className={`${styles.status} ${styles.pending}`}>{status}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Home Delivery List</h2>
          <p className={styles.subtitle}>Manage and track home delivery orders</p>
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
            <button type="button" className={styles.closeBtn} onClick={handleReset}>
              Clear
            </button>
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Loading..." : "🔍 Generate Report"}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {deliveries.length > 0 && (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Delivery Orders</h3>
              <span className={styles.resultCount}>{deliveries.length} orders found</span>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Delivery Address</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>#{delivery.id}</td>
                      <td><strong>{delivery.customer_name}</strong></td>
                      <td>{delivery.phone}</td>
                      <td className={styles.addressCell}>{delivery.address}</td>
                      <td>{delivery.delivery_date}</td>
                      <td className={styles.amountCell}>₨ {delivery.amount.toLocaleString()}</td>
                      <td>{getStatusBadge(delivery.status)}</td>
                      <td>
                        <button className={styles.viewBtn} title="View Details">
                          👁️
                        </button>
                        <button className={styles.trackBtn} title="Track Order">
                          📍
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!loading && deliveries.length === 0 && filters.from_date && filters.to_date && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>📦</div>
            <p>No home delivery orders found</p>
            <small>Try adjusting your date range</small>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Fetching delivery orders...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeDelivery;