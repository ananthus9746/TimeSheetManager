import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './chart.css'



ChartJS.register(ArcElement, Tooltip, Legend);


function Chart(props) {
  console.log("chart",props.data)
  return (
    <div className='chart'>

      <h1 className='overView'>Over View</h1>

    <Pie data={props.data} />
    </div>
  )
}

export default Chart