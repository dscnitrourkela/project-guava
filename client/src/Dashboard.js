import React from "react";
const Dashboard = (props) => {
  const { handleLogout } = props;
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
export default Dashboard;
