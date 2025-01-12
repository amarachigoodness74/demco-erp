// Dashboard.tsx

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayout from "../layouts/Dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220, 400],
        backgroundColor: "rgba(93, 102, 255, 0.8)",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
  };

  const tableData = [
    { id: 1, name: "Product A", sales: 150, revenue: "$450" },
    { id: 2, name: "Product B", sales: 200, revenue: "$600" },
    { id: 3, name: "Product C", sales: 120, revenue: "$360" },
  ];

  return (
    <DashboardLayout>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Welcome back, Admin!</p>
        </div>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Placeholder for Other Stats */}
          <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
            <h3 className="text-gray-500">Additional Stats</h3>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Sales
          </h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-600">
                <th className="p-2">#</th>
                <th className="p-2">Product</th>
                <th className="p-2">Sales</th>
                <th className="p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="border-t text-sm">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.sales}</td>
                  <td className="p-2">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Outlet /> */}
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
