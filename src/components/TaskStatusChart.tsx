import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

// Register all required elements
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const TaskStatusChart: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const todos = useSelector((state: RootState) => state.todos.todos);

  // Count tasks per status
  const statusCounts = {
    incomplete: 0,
    inProgress: 0,
    completed: 0,
  };

  todos.forEach(todo => {
    statusCounts[todo.status]++;
  });

  // Prepare data for Chart.js
  const data = {
    labels: ['Incomplete', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Task Status',
        data: [statusCounts.incomplete, statusCounts.inProgress, statusCounts.completed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Task Status Distribution',
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='flex-col md:flex-row flex justify-end md:items-center mt-8 md:mt-0'>
        <label htmlFor="chartType" className='text-white font-bold'>Please Select Chart Type: </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'pie' | 'bar' | 'line')}
          className='dropdown md:ml-1'
        >
          <option value="pie">Pie</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
      </div>
      <div className='flex  md:mt-0 mt-14'>
        {todos.length === 0 ? (
          <p className='text-center text-white font-bold text-xl'>
            Please add a new task to visualize.
          </p>
        ) : (
          renderChart()
        )}
      </div>
    </div>
  );
};

export default TaskStatusChart;
