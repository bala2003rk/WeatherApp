import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';

Chart.register(...registerables);

const WeatherChart = ({ labels, temps, humidities, windSpeeds }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: temps,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1,
                        yAxisID: 'y-temp',
                    },
                    {
                        label: 'Humidity (%)',
                        data: humidities,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1,
                        yAxisID: 'y-humidity',
                    },
                    {
                        label: 'Wind Speed (m/s)',
                        data: windSpeeds,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                        yAxisID: 'y-wind',
                    }
                ]
            },
            options: {
                scales: {
                    'y-temp': {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature (°C)',
                        }
                    },
                    'y-humidity': {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Humidity (%)',
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    'y-wind': {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Wind Speed (m/s)',
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
            },
        });

        return () => {
            chartInstance.current.destroy();
        };
    }, [labels, temps, humidities, windSpeeds]);

    return <canvas ref={chartRef} />;
};

export default WeatherChart;
