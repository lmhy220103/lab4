import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  });
  const getListOrchid = () => {
    fetch("https://66ff148b2b9aac9c997e368a.mockapi.io/orchids")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getListOrchid();
  }, []);

  const handleDelte = (id) => {
    if (window.confirm("are you want to delete ?")) {
      fetch(`https://66ff148b2b9aac9c997e368a.mockapi.io/orchids/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          getListOrchid();
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };
  const renderOrchidList = () => {
    return data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.rating}</td>
        <td>
          <img src={item.image} alt={item.name} width={100} height={100} />
        </td>
        <td>{item.origin}</td>
        <td>
          <button
            className="mx-2 pointer"
            onClick={() => {
              navigate(
                "/admin/manager-orchid/update/:id".replace(
                  ":id",
                  `${item.id.toString()}`
                )
              );
            }}
          >
            Update
          </button>
          <button className="pointer" onClick={() => handleDelte(item.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <button
        className="my-3 pointer"
        onClick={() => {
          navigate("/admin/manager-orchid/add");
        }}
      >
        Add Orchid
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Origin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderOrchidList()}</tbody>
      </Table>
    </>
  );
};

export default Admin;
