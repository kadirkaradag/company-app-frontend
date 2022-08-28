import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Department from "./components/Department.jsx";
import Employee from "./components/Employee.jsx";
import Home from "./components/Home.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">Company Frontend</h3>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item-m1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item-m1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item-m1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home></Home>} />
          <Route path="/department" element={<Department></Department>} />
          <Route path="/employee" element={<Employee></Employee>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
