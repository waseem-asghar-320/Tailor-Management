import { useNavigate } from "react-router-dom";

function AddButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/add-voucher")}
      style={{
        width: "150px",
        padding: "10px 5px",
        marginBottom: "10px",
        background: "#2c3e50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Add New Voucher
    </button>
  );
}

export default AddButton;