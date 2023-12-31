
import React from 'react'
import PropTypes from 'prop-types'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart(props) {
    const { options, data, onChange } = props
    onChange(data)
    return <Bar onChange={onChange} options={options} data={data} value={data} />
}

BarChart.propTypes = {
    options: PropTypes.object,
    data: PropTypes.object,
}

BarChart.defaultProps = {
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: 'Doanh sô',
            },
        },
    },
    data: {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
        ],
        datasets: [
            {
                label: 'Doanh số',
                data: [
                    10000000, 7345000, 15643000, 22456000, 12456000, 12663000, 18200000,
                ],
                backgroundColor: '#F7C100',
            },
        ],
    },

    onChange: () => { },
}

export default BarChart
