import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './modules/Authentication/Login.jsx';
import Dashboard from './modules/Home/Dashboard/Dashboard.jsx';
import Booking from "./modules/Home/Dashboard/Customers/Components/Booking/Booking.jsx";
import Delivery from "./modules/Home/Dashboard/Customers/Components/Delivery/Delivery.jsx";
import FindBooking from "./modules/Home/Dashboard/Customers/Components/Find-Booking/FindBooking.jsx";
import ShalwaarKameez from "./modules/Home/Dashboard/Customers/Components/ShalwarKameez/ShalwarKameez.jsx";
import Receipt from "./modules/Home/Dashboard/Customers/Components/Receipt/Receipt.jsx";
import Layout from "./modules/Home/Dashboard/Layout/Layout.jsx";
import DeliveryReport from "./modules/Home/Dashboard/Customers/Components/DeliveryReport/DeliveryReport.jsx";
import CustomerLedger from "./modules/Home/Dashboard/Customers/Components/CustomerLedger/CustomerLedger.jsx";
import AddCustomer from "./modules/Home/Dashboard/Customers/Components/AddEditCustomers/AddCustomer.jsx";
import Report from "./modules/Home/Dashboard/Customers/Components/Report/Report.jsx";
import CustomerBalance from "./modules/Home/Dashboard/Customers/Components/CustomerBalance/CustomerBalance.jsx";
// invoice section
import AddInvoice from "./modules/Home/Dashboard/Invoices/Components/AddInvoice/AddInvoice.jsx";
import Purchase from "./modules/Home/Dashboard/Invoices/Components/Purchase/Purchase.jsx";
import PurchaseReturn from "./modules/Home/Dashboard/Invoices/Components/PurchaseReturn/PurchaseReturn.jsx";
import StockAdjustment from "./modules/Home/Dashboard/Invoices/Components/StockAdjustment/StockAdjustment.jsx";

// Production Section
import Cutting from "./modules/Home/Dashboard/Production/Components/Cutting/Cutting.jsx";
import Karigar from "./modules/Home/Dashboard/Production/Components/Karigar/Karigar.jsx";
import KarigarReceiving from "./modules/Home/Dashboard/Production/Components/KarigarReceiving/KarigarReceiving.jsx";
import CuttingReceiving from "./modules/Home/Dashboard/Production/Components/CuttingReceiving/CuttingReceiving.jsx";

//Voucher Section
import AddVoucher from "./modules/Home/Dashboard/Vouchers/Components/AddVoucher/AddVoucher.jsx";
import VoucherForm from "./modules/Home/Dashboard/Vouchers/Components/VoucherForm/VoucherForm.jsx";
import PettyCash from "./modules/Home/Dashboard/Vouchers/Components/PettyCash/PettyCash.jsx";
import BankPayment from "./modules/Home/Dashboard/Vouchers/Components/BankPayment/BankPayment.jsx";
import BankReceipt from "./modules/Home/Dashboard/Vouchers/Components/BankReceipt/BankReceipt.jsx";

//Report Section
import Sales from "./modules/Home/Dashboard/Reports/Components/Sales/Sales.jsx";
import Ledger from "./modules/Home/Dashboard/Reports/Components/Ledger/Ledger.jsx";
import CashActivity from "./modules/Home/Dashboard/Reports/Components/CashActivity/CashActivity.jsx";
import CashBook from "./modules/Home/Dashboard/Reports/Components/CashBook/CashBook.jsx";
import BankBook from "./modules/Home/Dashboard/Reports/Components/BankBook/BankBook.jsx";
import ExpensesSummary from "./modules/Home/Dashboard/Reports/Components/ExpensesSummary/ExpensesSummary.jsx";
import KarigarWork from "./modules/Home/Dashboard/Reports/Components/KarigarWorkDetails/KarigarWork.jsx";
import ProfitOnSale from "./modules/Home/Dashboard/Reports/Components/ProfitOnSale/ProfitOnSale.jsx";
import TaxReport from "./modules/Home/Dashboard/Reports/Components/TaxReport/TaxReport.jsx";
import Purchases from "./modules/Home/Dashboard/Reports/Components/Purchase/Purchase.jsx";
import ProductList from "./modules/Home/Dashboard/Reports/Components/ProductList/ProductList.jsx";
import ChartOfAccounts from "./modules/Home/Dashboard/Reports/Components/ChartOfAccounts/ChartOfAccount.jsx";
import StockReport from "./modules/Home/Dashboard/Reports/Components/StockReport/StockReport.jsx";
import ItemLedger from "./modules/Home/Dashboard/Reports/Components/ItemLedger/ItemLedger.jsx";
import StockAdjustmentReport from "./modules/Home/Dashboard/Reports/Components/StockAdjustmentReport/StockAdjustmentReport.jsx";
import TrailBalance from "./modules/Home/Dashboard/Reports/Components/TrailBalance/TrailBalance.jsx";
import ProfitAndLoss from "./modules/Home/Dashboard/Reports/Components/ProfitAndLoss/ProfitAndLoss.jsx";

//Managment Section
import ChartOfAccount from "./modules/Home/Dashboard/Management/Components/ChartOfAccount/ChartOfAccount.jsx";

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
    {
      path: "/report-form",
      element: (
        <Layout>
          <Report />
        </Layout>
      )
    },
    {
      path: "/customer-balances-form",
      element: (
        <Layout>
          <CustomerBalance />
        </Layout>
      )
    },
    // invoice section path
    {
      path: "/add-invoice-form",
      element: (
        <Layout>
          <AddInvoice />
        </Layout>
      )   
    },
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
          <PurchaseReturn />
        </Layout>
      )   
    },
    {
      path: "/stock-adjustment-form",
      element: (
        <Layout>
          <StockAdjustment />
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
      path: "/karigar-form",
      element: (
        <Layout>
          <Karigar />
        </Layout>
      )   
    },
    {
      path: "/karigar-receiving-form",
      element: (
        <Layout>
          <KarigarReceiving />
        </Layout>
      )
    },
    {
      path: "/cutting-receiving-form",
      element: (
        <Layout>
          <CuttingReceiving />
        </Layout>
      )
    },
    //Voucher section 
    {
      path: "/voucher-form",
      element: (
        <Layout>
          <VoucherForm />
        </Layout>
      ) 
    },
    {
      path: "/petty-cash-form",
      element: (
        <Layout>        
          <PettyCash />
        </Layout>
      )
    },
    {
      path: "/bank-payment-form",
      element: (
        <Layout>
          <BankPayment />
        </Layout>
      ) 
    },
    {
      path: "/bank-receipt-form",
      element: (
        <Layout>
          <BankReceipt />
        </Layout>
      )   
    },
    {
      path: "/add-voucher",
      element: (
        <Layout>
          <AddVoucher />
        </Layout>
      ) 
    },

    //Report Section  
    {
      path: "/ledger-form",
      element: (
        <Layout>
          <Ledger />
        </Layout>
      ) 
    },
    {
      path: "/cash-activity-form",
      element: (
        <Layout>
          <CashActivity />
        </Layout>
      ) 
    },
    {
      path: "/cash-book-form",
      element: (
        <Layout>
          <CashBook />
        </Layout>
      )   
    },
    {
      path: "/bank-book-form",
      element: (
        <Layout>
          <BankBook />
        </Layout>
      )   
    },
    {
      path: "/expenses-summary-form",
      element: <Layout> 
        <ExpensesSummary />
      </Layout>
    },
    {
      path: "/karigar-work-detail-form",
      element: (
        <Layout>
          <KarigarWork />
        </Layout> 
      )  
    },
    {
      path: "/sales",
      element: <Layout>   
        <Sales />
      </Layout>
    },
    {
      path: "/profit-on-sale-form",
      element: (
        <Layout>
          <ProfitOnSale />
        </Layout>
      )
    },
    {
      path: "/purchases-form",
      element: (
        <Layout>
          <Purchases />
        </Layout>
      )
    },
    {
      path: "/tax-report-form",
      element: (
        <Layout>
          <TaxReport />
        </Layout>
      )
    },
    {
      path: "/products-list-form",
      element: (
        <Layout>      
          <ProductList />
        </Layout>
      )
    },
    {
      path: "/chart-of-accounts-form",
      element: (
        <Layout>
          <ChartOfAccounts />
        </Layout>
      )   
    },
    {
      path: "/stock-report-form",
      element: (
        <Layout>
          <StockReport />
        </Layout>
      )   
    },
    {
       path: "/item-ledger-form",
      element: (
        <Layout>
          <ItemLedger />
        </Layout>
      )
    },
    {
      path: "/stock-adjustments-form",
      element: (
        <Layout>
          <StockAdjustmentReport />
        </Layout>
      )
    },
    {
      path: "/trial-balance-form",
      element: (
        <Layout>
          <TrailBalance />
        </Layout>
      )
    },
    {
      path: "/Profit-loss-form",
      element: (
        <Layout>
          <ProfitAndLoss />
        </Layout>
      )
    },  

    //Managment Scetion

    {
     path: "/chart-of-accounts",
      element: (
        <Layout>
          <ChartOfAccount />
        </Layout>
      )
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
