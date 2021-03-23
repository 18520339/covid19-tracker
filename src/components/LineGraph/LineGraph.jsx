import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import './LineGraph.css';

export default function LineGraph({ type = 'cases' }) {
    const [data, setData] = useState([]);

    const buildChartData = useCallback(
        data => {
            const chartData = [];
            let lastDataPoint;

            for (let date in data[type]) {
                if (lastDataPoint)
                    chartData.push({
                        x: date,
                        y: data[type][date] - lastDataPoint,
                    });
                lastDataPoint = data[type][date];
            }
            return chartData;
        },
        [type]
    );

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => setData(buildChartData(data, type)));
    }, [type, buildChartData]);

    return (
        <div className='graph'>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                data,
                                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                                borderColor: '#cc1034',
                            },
                        ],
                    }}
                    options={{
                        legend: { display: false },
                        elements: { point: { radius: 0 } },
                        maintainAspectRatio: false,
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: ({ value }, data) => {
                                    return numeral(value).format('+0,0');
                                },
                            },
                        },
                        scales: {
                            xAxes: [
                                {
                                    type: 'time',
                                    time: {
                                        format: 'MM/DD/YY',
                                        tooltipFormat: 'll',
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    gridLines: { display: false },
                                    ticks: {
                                        callback: (value, index, values) => {
                                            return numeral(value).format('0a');
                                        },
                                    },
                                },
                            ],
                        },
                    }}
                />
            )}
        </div>
    );
}
