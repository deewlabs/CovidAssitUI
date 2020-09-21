import React, { useEffect } from "react";

import GroupedBarChart from "./charts/GroupedBarChart";
import useApi from "./hooks/useApi";
import dashboardApi from "../api/dashboard";

function Dashboard(props) {
  const dashBoardDataApi = useApi(dashboardApi.getDashboardData);

  useEffect(() => {
    dashBoardDataApi.request();
  }, []);

  return (
    <div style={{ padding: "100px" }}>
      {dashBoardDataApi.data.length > 0 && (
        <GroupedBarChart
          data={formatResponseForGroupChart(dashBoardDataApi.data[0])}
        />
      )}
    </div>
  );
}

export default Dashboard;

function formatResponseForGroupChart(data) {
  return [
    { name: "Ambulance Not Serviced", value: data.ambulanceNotServiced },
    { name: "Ambulance Serviced", value: data.ambulanceServiced },
    { name: "iCU Not Serviced", value: data.iCUNotServiced },
    { name: "iCU Serviced", value: data.iCUServiced },
    { name: "Isolation Bed Not Serviced", value: data.isolationBedNotServiced },
    { name: "Isolation Bed Serviced", value: data.isolationBedServiced },
    {
      name: "Oxygen Cylinder Not Serviced",
      value: data.oxygenCylinderNotServiced,
    },
    { name: "Oxygen Cylinder Serviced", value: data.oxygenCylinderServiced },
    { name: "Ventilator Not Serviced", value: data.ventilatorNotServiced },
    { name: "Ventilator Serviced", value: data.ventilatorServiced },
    { name: "Total Covid Tests Conducted", value : data.totalCovidTests},
    { name: "Total Positive Cases", value : data.totalPositiveTests}
  ];
}
