import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import "../styles/dashboard.css";
import Table from "../components/Table";
import API_URL from "./../api/api";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/restaurants/all`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setData(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dash-container">
      <SideBar />
      <div className="w-[85%]">
        <Table data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
