import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './modules/Authentication/Login.jsx';
import Dashboard from './modules/Home/Dashboard/Dashboard.jsx';
import Booking from "./modules/Home/Dashboard/Customers/Components/Booking/Booking.jsx";
import Delivery from "./modules/Home/Dashboard/Customers/Components/Delivery/Delivery.jsx";
import FindBooking from "./modules/Home/Dashboard/Customers/Components/Find-Booking/FindBooking.jsx";
import ShalwaarKameez from "./modules/Home/Dashboard/Customers/Components/ShalwarKameez/ShalwarKameez.jsx";
import Receipt from "./modules/Home/Dashboard/Customers/Components/Receipt/Receipt.jsx";
import Sales from "./modules/Home/Dashboard/Reports/Sales.jsx";
import Layout from "./modules/Home/Dashboard/Layout/Layout.jsx";
import DeliveryReport from "./modules/Home/Dashboard/Customers/Components/DeliveryReport/DeliveryReport.jsx";
import CustomerLedger from "./modules/Home/Dashboard/Customers/Components/CustomerLedger/CustomerLedger.jsx";
import AddCustomer from "./modules/Home/Dashboard/Customers/Components/AddEditCustomers/AddCustomer.jsx";

// invoice section
import Purchase from "./modules/Home/Dashboard/Invoices/Components/Purchase/Purchase.jsx";

// Production Section
import Cutting from "./modules/Home/Dashboard/Production/Components/Cutting/Cutting.jsx";
// const Navigate = useNavigate();

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "/login",
      element: <Login />
    },
    
    {
      path: "/dashboard",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      )
    },
    {
      path: "/booking-form",
      element: (
        <Layout>
          <Booking />
        </Layout>
      )
    },
    {
      path: "/shalwaar-kameez-form",
      element: (
        <Layout>
          <ShalwaarKameez />
        </Layout>
      )
    },
    {
      path: "/delivery-form",
      element: (
        <Layout>
          <Delivery />
        </Layout>
      )
    },
    {
      path: "/find-bookings-form",
      element: (
        <Layout>
          <FindBooking />
        </Layout>
      )
    },
    {
      path: "/receipt-form",
      element: (
        <Layout>
          <Receipt />
        </Layout>
      )
    },
    {
      path: "/delivery-report",
      element: (
        <Layout>
          <DeliveryReport />
        </Layout>
      )         
    },
    {
      path: "/customer-ledger-form",
      element: (
        <Layout>
          <CustomerLedger />
        </Layout>
      )
    },
    {
      path: "/add-edit-customers-form",
      element: (
        <Layout>
          <AddCustomer />
        </Layout>
      )   
    },
    // purchase section path
    {
      path: "/purchase-form",
      element: (
        <Layout>
          <Purchase />
        </Layout>
      )   
    },
    {
      path: "/purchase-return-form",
      element: (
        <Layout>
          <Purchase />
        </Layout>
      )   
    },
    //Production section
    {
      path: "/cutting-form",
      element: (
        <Layout>
          <Cutting />
        </Layout>
      )   
    },
    {
      path: "/sales",
      element: <Sales />
    },
    {
      path: "*",
      element: <h1 style={{textAlign:"center",marginTop:"50px"}}>404 - Page Not Found</h1> 
    }
  ]);


  return (
    <>

      <RouterProvider router={router} />
      
    </>
  )
}

export default App
