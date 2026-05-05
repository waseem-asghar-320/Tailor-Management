import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './modules/Authentication/Login.jsx';
import Dashboard from './modules/Home/Dashboard/Dashboard.jsx';
import Booking from "./modules/Home/Dashboard/Customers/Components/Booking/Booking.jsx";
import Delivery from "./modules/Home/Dashboard/Customers/Components/Delivery/Delivery.jsx";
import FindBooking from "./modules/Home/Dashboard/Customers/Components/Find-Booking/FindBooking.jsx";
import ShalwaarKameez from "./modules/Home/Dashboard/Customers/Components/ShalwarKameez/ShalwarKameez.jsx";
import Receipt from "./modules/Home/Dashboard/Customers/Components/Receipt/Receipt.jsx";
import Sales from "./modules/Home/Dashboard/Reports/Sales.jsx";

// const Navigate = useNavigate();

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/booking-form",
      element: <Booking />
    },
    {
      path: "/shalwaar-kameez-form",
      element: <ShalwaarKameez />
    },
    {
      path: "/delivery-form",
      element: <Delivery />
    },
    {
      path: "/find-bookings-form",
      element: <FindBooking />
    },
    {
      path: "/receipt-form",
      element: <Receipt />
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
