
import React from 'react'
import { Pie as PieChart } from 'react-chartjs-2';

function GlobalInfoChart({ data }) {

    const { TotalConfirmed, TotalRecovered } = data;

    return (
        Object.keys(data).length ?
            <PieChart
                data={{
                    labels: [
                        'Total Confirmed',
                        'Total Recovered'
                    ],
                    datasets: [{
                        data: Object.values([TotalConfirmed, TotalRecovered]),
                        backgroundColor: [
                            '#FF6384',
                            '#4ac0c0'
                        ],
                        hoverBackgroundColor: [
                            '#FF6384',
                            '#4abdbe'
                        ]
                    }]
                }}
            /> : null
    )
}

export default GlobalInfoChart
