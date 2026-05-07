import { useState } from "react";
import styles from "./AddCustomer.module.css";

function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "male"
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Customer Data:", customer);

    // API call here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Add / Edit Customer</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                value={customer.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="03XXXXXXXXX"
                value={customer.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={customer.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={customer.address}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Gender</label>

              <select
                name="gender"
                value={customer.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <button type="submit">
            Save Customer
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddCustomer;