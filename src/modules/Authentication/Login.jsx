import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "Staff",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.email) {
      alert("Please enter email");
      setLoading(false);
      return;
    }
    if (!formData.password) {
      alert("Please enter password");
      setLoading(false);
      return;
    }

    try {
      // API call for login
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        const user = {
          id: data.user.id,
          name: data.user.fullName || data.user.name,
          email: data.user.email,
          role: data.user.role,
          phone: data.user.phone || "",
          address: data.user.address || ""
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);
        
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.fullName) {
      alert("Please enter full name");
      setLoading(false);
      return;
    }
    if (!formData.email) {
      alert("Please enter email");
      setLoading(false);
      return;
    }
    if (!formData.phone) {
      alert("Please enter phone number");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // API call for signup
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          role: formData.role,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        const user = {
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
          role: data.user.role,
          phone: data.user.phone,
          address: data.user.address
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);
        
        alert("Account created successfully!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">✨</span>
            <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          </div>
          <p className="auth-subtitle">
            {isLogin ? "Please login to your account" : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>

              <div className="input-group">
                <label>Address (Optional)</label>
                <textarea
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>

              <div className="input-group">
                <label>Role</label>
                <select name="role" onChange={handleChange} required value={formData.role}>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                value={formData.password}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="input-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                address: "",
                role: "Staff",
                password: "",
                confirmPassword: "",
              });
              setShowPassword(false);
              setShowConfirmPassword(false);
            }} className="toggle-link">
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}