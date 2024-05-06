import React from "react";
import "./App.css";
import CommnBg from "./components/BackgroundLogin/CommnBg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import LoginForm from "./components/Login/LoginForm";
import SetNewPassword from "./components/SetNewPassword/SetNewPassword";
import Dashboard from "./components/Main/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddUser from "./components/Main/ManageUsers/AddUser2";
import AddWarehouse from "./components/Main/ManageWarehouse/AddWarehouse";
import Content from "./components/commonForAll/Content";
import AddProduct from "./components/Main/Manage_product/addProduct";
import AddStock from "./components/Main/ManageStock/add_stock";
import MakeOrder from "./components/Main/manage_order/make_order";
import UserList from "./components/Main/ManageUsers/UserList";
import ProductList from "./components/Main/Manage_product/productList";
import WarehouseList from "./components/Main/ManageWarehouse/WarehouseList";
import StockList from "./components/Main/ManageStock/StockList2";
import Your_order from "./components/Main/manage_order/Your_order";
import Incoming_order from "./components/Main/manage_order/Incoming_order";
import Outgoing_order from "./components/Main/manage_order/outgoing_order";
import Table from "./components/commonForAll/Table";
// import Report from "./components/Main/Reports/Reports";
import Reports from "./components/Main/Reports/Reports";
import UpdateProfile from "./components/Main/UpdateProfile/UpdateProfile";
import Notification from "./components/Main/Notification/Notification";
import History from "./components/Main/History/History";
import Return_order from "./components/Main/manage_order/Return_order";

function App() {
  const isLogin = window.localStorage.getItem("loggedIn");
  const username = window.localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogin ? <Content /> : <CommnBg />}>
          <Route path="" element={isLogin ? <Content /> : <LoginForm />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="newpass" element={<SetNewPassword />} />
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="add-user"
            element={
              <PrivateRoute>
                <AddUser />
              </PrivateRoute>
            }
          />
          <Route
            path="add-Warehouse"
            element={
              <PrivateRoute>
                <AddWarehouse />
              </PrivateRoute>
            }
          />
          <Route
            path="WarehouseList"
            element={
              <PrivateRoute>
                <WarehouseList />
              </PrivateRoute>
            }
          />

          <Route
            path="add-product"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="products"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="add-stock"
            element={
              <PrivateRoute>
                <AddStock />
              </PrivateRoute>
            }
          />
          <Route
            path="stockList"
            element={
              <PrivateRoute>
                <StockList />
              </PrivateRoute>
            }
          />

          <Route
            path="make-order"
            element={
              <PrivateRoute>
                <MakeOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="your-order"
            element={
              <PrivateRoute>
                <Your_order />
              </PrivateRoute>
            }
          />
          <Route
            path="incoming-order"
            element={
              <PrivateRoute>
                <Incoming_order />
              </PrivateRoute>
            }
          />
          <Route
            path="Outgoing-order"
            element={
              <PrivateRoute>
                <Outgoing_order />
              </PrivateRoute>
            }
          />
             <Route
            path="Return-order"
            element={
              <PrivateRoute>
                <Return_order />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="Table"
            element={
              <PrivateRoute>
                <Table />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="report"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />

          <Route
            path="update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="notification"
            element={
              <PrivateRoute>
                <Notification />
              </PrivateRoute>
            }
          />

          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Route>
        {/* <Route path='demo' element={<DemoForm />} />
      
        <Route path='add-warehouse' element={<AddWarehouse/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
