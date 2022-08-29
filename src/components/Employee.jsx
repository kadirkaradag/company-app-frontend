/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { variables } from "../Variables.js";

const Employee = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [EmployeeId, setEmployeeId] = useState();
  const [EmployeeName, setEmployeeName] = useState("");
  const [Department, setDepartment] = useState("");
  const [DateOfJoining, setDateOfJoining] = useState("");
  const [PhotoFileName, setPhotoFileName] = useState("anonymous.png");
  const [PhotoPath] = useState(variables.PHOTO_URL);

  const refreshList = () => {
    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      });

    fetch(variables.API_URL + "employee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  };
  useEffect(() => {
    refreshList();
    console.log(employees);
  }, []);

  const addClick = () => {
    setModalTitle("Add Employee");
    setEmployeeId(0);
    setEmployeeName("");
    setDepartment("");
    setDateOfJoining("");
    setPhotoFileName("anonymous.png");
  };

  const editClick = (emp) => {
    setModalTitle("Edit Employee");
    setEmployeeId(emp.EmployeeId);
    setEmployeeName(emp.EmployeeName);
    setDepartment(emp.Department);
    setDateOfJoining(emp.DateOfJoining);
    setPhotoFileName(emp.PhotoFileName);
  };

  const createClick = () => {
    fetch(variables.API_URL + "employee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeName: EmployeeName,
        Department: Department,
        DateOfJoining: DateOfJoining,
        PhotoFileName: PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  };
  const updateClick = (emp) => {
    fetch(variables.API_URL + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeeId: EmployeeId,
        EmployeeName: EmployeeName,
        Department: Department,
        DateOfJoining: DateOfJoining,
        PhotoFileName: PhotoFileName,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  };
  const deleteClick = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  };

  console.log("emp", employees);
  const imageUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);

      fetch(variables.API_URL + "employee/savefile", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhotoFileName(data);
        });
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Employee
      </button>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>EmployeeName</th>
            <th>Department</th>
            <th>DateOfJoining</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((x) => (
            <tr key={x.EmployeeId}>
              <td>{x.EmployeeId}</td>
              <td>{x.EmployeeName}</td>
              <td>{x.Department}</td>
              <td>{x.DateOfJoining}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => editClick(x)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(x.EmployeeId)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                    <span className="input-group-text">EmployeeName</span>
                    <input
                      type="text"
                      className="form-control"
                      value={EmployeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                    ></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">Department</span>
                    <select
                      className="form-select"
                      onChange={(e) => setDepartment(e.target.value)}
                      value={Department}
                    >
                      {departments.map((dep) => (
                        <option key={dep.DepartmentId}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">DOJ</span>
                    <input
                      type="date"
                      className="form-control"
                      value={DateOfJoining}
                      onChange={(e) => setDateOfJoining(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="p-2 w-50 bd-highlight">
                  <img
                    width="250px"
                    height="250px"
                    src={PhotoPath + PhotoFileName}
                  />
                  <input
                    className="m-2"
                    type="file"
                    onChange={(e) => imageUpload(e)}
                  ></input>
                </div>
              </div>
              {EmployeeId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}
              {EmployeeId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={updateClick}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
