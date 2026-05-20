import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import {
  FaMoon,
  FaSun,
  FaLanguage,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaPrint,
  FaReceipt,
  FaUserCog,
  FaSave,
  FaUndo,
  FaGlobe,
  FaLock,
  FaEnvelope,
  FaMobile,
  FaFileAlt
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Settings State
  const [settings, setSettings] = useState({
    // General Settings
    company_name: "Tailor Soft",
    company_logo: "",
    company_email: "info@tailorsoft.com",
    company_phone: "+92 300 1234567",
    company_address: "123 Main Street, Lahore, Pakistan",
    
    // Invoice Settings
    invoice_prefix: "INV",
    invoice_start_number: "1001",
    invoice_terms: "Payment due within 15 days",
    invoice_footer_text: "Thank you for your business!",
    
    // Notification Settings
    email_notifications: true,
    sms_notifications: false,
    low_stock_alert: true,
    daily_summary: true,
    
    // Security Settings
    two_factor_auth: false,
    session_timeout: "30",
    login_attempts: "3",
    
    // Print Settings
    print_header: true,
    print_footer: true,
    paper_size: "A4",
    
    // Language
    language: "english",
    
    // Date Format
    date_format: "DD/MM/YYYY",
    
    // Currency
    currency: "PKR",
    currency_symbol: "₨"
  });

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
    setSaved(false);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save settings to API
      await fetch("http://127.0.0.1:8000/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert("Settings saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default?")) {
      setSettings({
        company_name: "Tailor Soft",
        company_logo: "",
        company_email: "info@tailorsoft.com",
        company_phone: "+92 300 1234567",
        company_address: "123 Main Street, Lahore, Pakistan",
        invoice_prefix: "INV",
        invoice_start_number: "1001",
        invoice_terms: "Payment due within 15 days",
        invoice_footer_text: "Thank you for your business!",
        email_notifications: true,
        sms_notifications: false,
        low_stock_alert: true,
        daily_summary: true,
        two_factor_auth: false,
        session_timeout: "30",
        login_attempts: "3",
        print_header: true,
        print_footer: true,
        paper_size: "A4",
        language: "english",
        date_format: "DD/MM/YYYY",
        currency: "PKR",
        currency_symbol: "₨"
      });
      setTheme("light");
    }
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Configure your application preferences</p>
        </div>

        {/* Theme Toggle Card */}
        <div className={styles.themeCard}>
          <div className={styles.themeContent}>
            <div className={styles.themeIcon}>
              {theme === "light" ? <FaSun /> : <FaMoon />}
            </div>
            <div className={styles.themeInfo}>
              <h3>{theme === "light" ? "Light Mode" : "Dark Mode"}</h3>
              <p>Switch between light and dark theme</p>
            </div>
          </div>
          <button className={styles.themeToggle} onClick={handleThemeToggle}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* General Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaUserCog className={styles.sectionIcon} />
              <h2>General Settings</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Company Name</label>
                <input type="text" name="company_name" value={settings.company_name} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Company Email</label>
                <input type="email" name="company_email" value={settings.company_email} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Company Phone</label>
                <input type="text" name="company_phone" value={settings.company_phone} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Company Address</label>
                <textarea name="company_address" value={settings.company_address} onChange={handleChange} rows="2" />
              </div>
            </div>
          </div>

          {/* Invoice Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaReceipt className={styles.sectionIcon} />
              <h2>Invoice Settings</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Invoice Prefix</label>
                <input type="text" name="invoice_prefix" value={settings.invoice_prefix} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Invoice Start Number</label>
                <input type="text" name="invoice_start_number" value={settings.invoice_start_number} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Invoice Terms</label>
                <textarea name="invoice_terms" value={settings.invoice_terms} onChange={handleChange} rows="2" />
              </div>
              <div className={styles.field}>
                <label>Invoice Footer Text</label>
                <textarea name="invoice_footer_text" value={settings.invoice_footer_text} onChange={handleChange} rows="2" />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaBell className={styles.sectionIcon} />
              <h2>Notification Settings</h2>
            </div>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkboxField}>
                <input type="checkbox" name="email_notifications" checked={settings.email_notifications} onChange={handleChange} />
                <span>📧 Email Notifications</span>
              </label>
              <label className={styles.checkboxField}>
                <input type="checkbox" name="sms_notifications" checked={settings.sms_notifications} onChange={handleChange} />
                <span>📱 SMS Notifications</span>
              </label>
              <label className={styles.checkboxField}>
                <input type="checkbox" name="low_stock_alert" checked={settings.low_stock_alert} onChange={handleChange} />
                <span>⚠️ Low Stock Alert</span>
              </label>
              <label className={styles.checkboxField}>
                <input type="checkbox" name="daily_summary" checked={settings.daily_summary} onChange={handleChange} />
                <span>📊 Daily Summary Report</span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaShieldAlt className={styles.sectionIcon} />
              <h2>Security Settings</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Session Timeout (minutes)</label>
                <input type="number" name="session_timeout" value={settings.session_timeout} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label>Max Login Attempts</label>
                <input type="number" name="login_attempts" value={settings.login_attempts} onChange={handleChange} />
              </div>
              <div className={styles.checkboxField}>
                <input type="checkbox" name="two_factor_auth" checked={settings.two_factor_auth} onChange={handleChange} />
                <span>🔐 Two Factor Authentication</span>
              </div>
            </div>
          </div>

          {/* Print Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaPrint className={styles.sectionIcon} />
              <h2>Print Settings</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Paper Size</label>
                <select name="paper_size" value={settings.paper_size} onChange={handleChange}>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                  <option value="Thermal">Thermal</option>
                </select>
              </div>
              <div className={styles.checkboxField}>
                <input type="checkbox" name="print_header" checked={settings.print_header} onChange={handleChange} />
                <span>📄 Print Header</span>
              </div>
              <div className={styles.checkboxField}>
                <input type="checkbox" name="print_footer" checked={settings.print_footer} onChange={handleChange} />
                <span>📄 Print Footer</span>
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaGlobe className={styles.sectionIcon} />
              <h2>Regional Settings</h2>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label>Language</label>
                <select name="language" value={settings.language} onChange={handleChange}>
                  <option value="english">English</option>
                  <option value="urdu">اردو</option>
                  <option value="arabic">العربية</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Date Format</label>
                <select name="date_format" value={settings.date_format} onChange={handleChange}>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Currency</label>
                <select name="currency" value={settings.currency} onChange={handleChange}>
                  <option value="PKR">Pakistani Rupee (PKR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className={styles.formActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              <FaUndo /> Reset to Default
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              <FaSave /> {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>

          {saved && (
            <div className={styles.successMessage}>
              ✅ Settings saved successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Settings;