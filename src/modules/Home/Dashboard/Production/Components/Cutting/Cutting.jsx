import { useState } from "react";
import styles from "./Cutting.module.css";

function Cutting() {
  const [fabric, setFabric] = useState({
    name: "",
    stock: "",
    price_per_meter: "",
    brand: "",
    category: "",
    quality: "",
    unit: "meter",
    status: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFabric({
      ...fabric,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Fabric Data:", fabric);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2>Fabric Management</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Fabric Name */}
            <div className={styles.field}>
              <label>Fabric Name</label>

              <input
                type="text"
                name="name"
                value={fabric.name}
                onChange={handleChange}
                placeholder="Enter fabric name"
              />
            </div>

            {/* Stock */}
            <div className={styles.field}>
              <label>Stock</label>

              <input
                type="number"
                name="stock"
                value={fabric.stock}
                onChange={handleChange}
                placeholder="Enter stock"
              />
            </div>

            {/* Price */}
            <div className={styles.field}>
              <label>Price Per Meter</label>

              <input
                type="number"
                step="0.01"
                name="price_per_meter"
                value={fabric.price_per_meter}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>

            {/* Brand */}
            <div className={styles.field}>
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                value={fabric.brand}
                onChange={handleChange}
                placeholder="Enter brand"
              />
            </div>

            {/* Category */}
            <div className={styles.field}>
              <label>Category</label>

              <select
                name="category"
                value={fabric.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="WashNWear">Wash & Wear</option>
                <option value="Cotton">Cotton</option>
              </select>
            </div>

            {/* Quality */}
            <div className={styles.field}>
              <label>Quality</label>

              <select
                name="quality"
                value={fabric.quality}
                onChange={handleChange}
              >
                <option value="">Select Quality</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Unit */}
            <div className={styles.field}>
              <label>Unit</label>

              <select
                name="unit"
                value={fabric.unit}
                onChange={handleChange}
              >
                <option value="meter">Meter</option>
                <option value="yard">Yard</option>
              </select>
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status</label>

              <select
                name="status"
                value={fabric.status}
                onChange={handleChange}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

          </div>

          <button type="submit">
            Save Fabric
          </button>

        </form>
      </div>
    </div>
  );
}

export default Cutting;