<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div class="flex items-center space-x-4">
        <span class="text-lg text-gray-600">Admin</span>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" class="w-10 h-10 rounded-full" />
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div class="stat-card bg-green-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl">Total Employees</h3>
        <p class="text-2xl font-bold">26</p>
        <p>+0.2%</p>
      </div>
      <div class="stat-card bg-blue-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl">Today Presents</h3>
        <p class="text-2xl font-bold">04</p>
        <p>+0.1%</p>
      </div>
      <div class="stat-card bg-red-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl">Today Absents</h3>
        <p class="text-2xl font-bold">12</p>
        <p>-0.5%</p>
      </div>
      <div class="stat-card bg-yellow-500 text-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl">Today Leave</h3>
        <p class="text-2xl font-bold">10</p>
        <p>+0.1%</p>
      </div>
    </div>

    <!-- Attendance Chart -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-semibold mb-4">Attendance Statistics</h2>
      <line-chart />
    </div>

    <!-- Recruitment & Payroll Expenses Section -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Recruitment Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Recruitment</h2>
        <p class="text-gray-600">Engineer: 10 (Frontend), 5 (Backend)</p>
      </div>
      <!-- Payroll Expenses Section -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Payroll Expenses Breakdown</h2>
        <bar-chart />
      </div>
    </div>
  </div>
</template>

<script>
// Importing chart components
import LineChart from '@/components/LineChart.vue';  // Assume this component is created
import BarChart from '@/components/BarChart.vue';    // Assume this component is created

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    BarChart
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
