import React from 'react'
import { Line } from 'react-chartjs-2';


function TimeSeriesChart({ data }) {

    const { cases, deaths, recovered, dates } = data;

    return (
        Object.keys(data).length &&
        <Line data={{
            labels: dates.map(date => date),
            datasets: [
                {
                    label: 'Recovered',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(75,192,192,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Object.values(recovered)
                },
                {
                    label: 'Deaths',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255, 99, 132,0.4)',
                    borderColor: 'rgba(255, 99, 132,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 99, 132,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
                    pointHoverBorderColor: 'rgba(255, 99, 132,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Object.values(deaths)
                },
                {
                    label: 'Cases',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(54, 162, 235,0.4)',
                    borderColor: 'rgba(54, 162, 235,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(54, 162, 235,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(54, 162, 235,1)',
                    pointHoverBorderColor: 'rgba(54, 162, 235,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: Object.values(cases)
                }
            ]
        }}
            options={{
                responsive: true,
                title: {
                    display: true,
                    text: 'Last 90 days',
                    fontSize: 20,
                    position: 'top'

                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        display: true,
                        stacked: false,
                        ticks: {
                            maxRotation: 0,
                            maxTicksLimit: 3,
                            // labelOffset: 50
                            callback: function (date, i) {
                                return new Date(date).toLocaleDateString('en-GB', {
                                    day : 'numeric',
                                    month : 'short',
                                    year : 'numeric'
                                }).split(' ').join('-');
                                    ;
                            },
                            source: 'data'
                        }
                    }]
                }
            }} />
    )
}

export default TimeSeriesChart;
