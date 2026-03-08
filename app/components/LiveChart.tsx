'use client';
import React, { useRef, useEffect } from 'react';
import {
Chart,
LineController,
LineElement,
PointElement,
LinearScale,
CategoryScale,
Title
} from 'chart.js';


Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title);


interface LiveChartProps {
label: string;
color: string;
data: number[];
labels: string[];
}


const LiveChart: React.FC<LiveChartProps> = ({ label, color, data, labels }) => {
const canvasRef = useRef<HTMLCanvasElement>(null);
const chartRef = useRef<Chart | null>(null);


useEffect(() => {
if (canvasRef.current) {
if (chartRef.current) chartRef.current.destroy();
chartRef.current = new Chart(canvasRef.current, {
type: 'line',
data: {
labels,
datasets: [
{
label,
data,
borderColor: color,
tension: 0.2,
borderWidth: 2,
pointRadius: 0
}
]
},
options: {
responsive: true,
animation: false,
plugins: { legend: { display: false } },
scales: {
x: { ticks: { display: false } },
y: { beginAtZero: true }
}
}
});
}
}, [data, labels]);


return <canvas ref={canvasRef} />;
};


export default LiveChart;
