import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './modules/Authentication/Login.jsx';
import Dashboard from './modules/Home/Dashboard/Dashboard.jsx';
import ShalwarKameez from "./modules/Home/Dashboard/Customers/Components/ShalwarKameez/ShalwarKameez.jsx";
import Sales from "./modules/Home/Dashboard/Reports/Sales.jsx";

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
      element: <Dashboard />
    },
    {
      path: "/booking-form",
      element: <ShalwarKameez />
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
