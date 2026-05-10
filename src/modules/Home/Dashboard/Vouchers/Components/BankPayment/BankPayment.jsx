import { useState } from "react";
import styles from "./BankPayment.module.css";
import AddButton from "../AddButton/AddButton";

function BankPayment() {

  const [payment, setPayment] = useState({
    ref_no: "BP-001",
    bank_from: "",
    cheque_no: "",
    cheque_date: "",
    paid_to: "",
    amount: "",
    remarks: "",
    user: "admin"
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Bank Payment:", payment);

    // API call here
  };

  return (
    <div className={styles.container}>
      <AddButton />
      <div className={styles.card}>
        

        <h2>Bank Payment Voucher</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.grid}>

            {/* Ref No */}
            <div className={styles.field}>
              <label>Reference No</label>

              <input
                type="text"
                name="ref_no"
                value={payment.ref_no}
                onChange={handleChange}
              />
            </div>

            {/* Bank From */}
            <div className={styles.field}>
              <label>Bank From</label>

              <input
                type="text"
                name="bank_from"
                value={payment.bank_from}
                onChange={handleChange}
                placeholder="Enter bank name"
              />
            </div>

            {/* Cheque No */}
            <div className={styles.field}>
              <label>Cheque No</label>

              <input
                type="text"
                name="cheque_no"
                value={payment.cheque_no}
                onChange={handleChange}
                placeholder="Enter cheque number"
              />
            </div>

            {/* Cheque Date */}
            <div className={styles.field}>
              <label>Cheque Date</label>

              <input
                type="date"
                name="cheque_date"
                value={payment.cheque_date}
                onChange={handleChange}
              />
            </div>

            {/* Paid To */}
            <div className={styles.field}>
              <label>Paid To</label>

              <input
                type="text"
                name="paid_to"
                value={payment.paid_to}
                onChange={handleChange}
                placeholder="Enter receiver name"
              />
            </div>

            {/* Amount */}
            <div className={styles.field}>
              <label>Amount</label>

              <input
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            {/* User */}
            <div className={styles.field}>
              <label>User</label>

              <input
                type="text"
                name="user"
                value={payment.user}
                onChange={handleChange}
              />
            </div>

            {/* Remarks */}
            <div className={styles.fullWidth}>
              <label>Remarks</label>

              <textarea
                name="remarks"
                value={payment.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
              />
            </div>

          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h3>
              Payment Amount: Rs. {payment.amount || 0}
            </h3>
          </div>

          <button type="submit">
            Save Voucher
          </button>

        </form>

      </div>

    </div>
  );
}

export default BankPayment;