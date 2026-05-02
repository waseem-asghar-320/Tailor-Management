import React, { useState } from "react";
import "./Login.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "Staff",
    password: "",
    confirmPassword: "",
  });


   const navigate = useNavigate();

  const handleLogin = () => {
    // here you can add validation or API call later
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    console.log("Form Data:", formData);
    // alert(isLogin ? "Login Successful" : "Signup Successful");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Address (Optional)"
                onChange={handleChange}
              />

              <select name="role" onChange={handleChange} required>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />
          )}

          <button type="submit" onClick={handleLogin}>
            {isLogin ? "Login" : "Create Account"}

          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle">
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}