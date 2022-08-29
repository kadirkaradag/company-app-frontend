/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { variables } from "../Variables.js";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [DepartmentId, setDepartmentId] = useState();
  const [DepartmentName, setDepartmentName] = useState("");
  const [DepartmentIdFilter, setDepartmentIdFilter] = useState("");
  const [DepName, setDepName] = useState("");
  const [departmentsWithoutFilter, setDepartmentsWithoutFilter] = useState([]);

  useEffect(() => {
    filterFn();
  }, [DepartmentIdFilter]);
  useEffect(() => {
    filterFn();
  }, [DepName]);

  const filterFn = () => {
    const depIdFilter = DepartmentIdFilter;
    const depNameFilter = DepName;

    const filteredData = departmentsWithoutFilter.filter((x) => {
      return (
        x.DepartmentId.toString()
          .toLowerCase()
          .includes(depIdFilter.toString().trim().toLowerCase()) &&
        x.DepartmentName.toString()
          .toLowerCase()
          .includes(depNameFilter.toString().trim().toLowerCase())
      );
    });
    setDepartments(filteredData);
  };

  const sortById = (asc) => {
    let sortedData;
    if (asc) {
      sortedData = [...departments].sort(
        (a, b) => a.DepartmentId - b.DepartmentId
      );
    } else {
      sortedData = [...departments].sort(
        (a, b) => b.DepartmentId - a.DepartmentId
      );
    }
    setDepartments(sortedData);
  };

  const sortByName = (asc) => {
    let sortedData;
    if (asc) {
      sortedData = [...departments].sort((a, b) =>
        a.DepartmentName > b.DepartmentName ? 1 : -1
      );
    } else {
      sortedData = [...departments].sort((a, b) =>
        a.DepartmentName > b.DepartmentName ? -1 : 1
      );
    }

    setDepartments(sortedData);
  };
  const refreshList = () => {
    fetch(variables.API_URL + "department")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
        setDepartmentsWithoutFilter(data);
      });
  };
  useEffect(() => {
    refreshList();
    console.log(departments);
  }, []);

  const addClick = () => {
    setModalTitle("Add Department");
    setDepartmentId(0);
    setDepartmentName("");
  };

  const editClick = (dep) => {
    setModalTitle("Edit Department");
    setDepartmentId(dep.DepartmentId);
    setDepartmentName(dep.DepartmentName);
  };

  const createClick = () => {
    fetch(variables.API_URL + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName: DepartmentName,
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

  const updateClick = (dep) => {
    fetch(variables.API_URL + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentId: DepartmentId,
        DepartmentName: DepartmentName,
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
      fetch(variables.API_URL + "department/" + id, {
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

  // const changeDepartmentIdFilter = (e) => {
  //   setDepartmentIdFilter(e.target.value);
  //   filterFn();
  // };
  // const changeDepartmentNameFilter = (e) => {
  //   setDepName(e.target.value);
  //   filterFn();
  // };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => addClick()}
      >
        Add Department
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <div className="d-flex flex-row">
                <input
                  className="form-control m-2"
                  onChange={(e) => setDepartmentIdFilter(e.target.value)}
                  placeholder="Filter"
                />
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortById(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortById(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </button>
              </div>
              DepartmentId
            </th>
            <th>
              <div className="d-flex flex-row">
                <input
                  className="form-control m-2"
                  onChange={(e) => setDepName(e.target.value)}
                  placeholder="Filter"
                />
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortByName(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => sortByName(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </button>
              </div>
              DepartmentName
            </th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((x) => (
            <tr key={x.DepartmentId}>
              <td>{x.DepartmentId}</td>
              <td>{x.DepartmentName}</td>
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
                  onClick={() => deleteClick(x.DepartmentId)}
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
              <div className="input-group mb-3">
                <span className="input-group-text">DepartmentName</span>
                <input
                  type="text"
                  className="form-control"
                  value={DepartmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                ></input>
              </div>
              {DepartmentId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={createClick}
                >
                  Create
                </button>
              ) : null}
              {DepartmentId !== 0 ? (
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

export default Department;
