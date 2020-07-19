import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { DataTable, ErrorBoundary, CountryPicker } from 'components';
import { getSummary } from 'services/api'
import { chunck, getMaxHeight } from 'utils';

let tableRows = [];
const rowsCountPerPage = 10;
const columns = [
    {
        id: 'country',
        label: 'Country Name',
    },
    {
        id: 'newConfirmed',
        label: 'New Confirmed',
        align: 'left'
    },
    {
        id: 'totalConfirmed',
        label: 'Total Confirmed',
        align: 'left'
    },
    {
        id: 'newDeaths',
        label: 'New Deaths',
        align: 'left'
    },
    {
        id: 'newRecovered',
        label: 'New Recovered',
        align: 'left'
    },
    {
        id: 'totalRecovered',
        label: 'Total Recovered',
        align: 'left'
    }
];
const useStyles = makeStyles({
    green: {
        backgroundColor: 'green',
        color: '#fff',
        fontWeight: 'bold'
    },
    red: {
        backgroundColor: 'red',
        color: '#fff',
        fontWeight: 'bold'
    },
    yellow: {
        backgroundColor: 'yellow',
        color: '#000',
        fontWeight: 'bold'
    },
});

const createRowData = (data) => {
    return {
        id: data['CountryCode'],
        country: { value: data['Country'], style: data['style'] },
        newConfirmed: { value: data['NewConfirmed'], style: data['style'] },
        totalConfirmed: { value: data['TotalConfirmed'], style: data['style'] },
        newDeaths: { value: data['NewDeaths'], style: data['style'] },
        newRecovered: { value: data['NewRecovered'], style: data['style'] },
        totalRecovered: { value: data['TotalRecovered'], style: data['style'] }
    }
}

function SummaryPage() {
    const [rows, setRows] = useState([]);
    const [countries, setCountry] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            const data = await getSummary();
            tableRows = data['Countries'].reduce(
                (items, item) => {
                    items.push(createRowData(item))
                    return items;
                }, [])
            generateTableRows(tableRows, rowsCountPerPage);
        })()
    }, []);


    useEffect(() => {
        if (countries.length) {
            const rows = tableRows.reduce((acc, row) => {
                const item = countries.find(country => row.id === country.ISO2);
                if (item) {
                    acc.push(row);
                }
                return acc;
            }, []);

            return generateTableRows(rows, rowsCountPerPage);
        }

        return generateTableRows(tableRows, rowsCountPerPage);

    }, [countries]);


    const generateTableRows = (rows, rowsPerPage) => {
        const rowsCopy = JSON.parse(JSON.stringify(rows));
        const chuncks = chunck(rowsCopy, rowsPerPage);
        const newRows = [];

        chuncks.map((chunck) => {
            const hRecoveredRow = getMaxHeight(chunck, 'totalRecovered');
            const hDeathsRow = getMaxHeight(chunck, 'newDeaths');
            const hConfirmedRow = getMaxHeight(chunck, 'newConfirmed');

            hRecoveredRow.totalRecovered.style = classes.green;
            hDeathsRow.newDeaths.style = classes.red;
            hConfirmedRow.newConfirmed.style = classes.yellow;
            newRows.push(...chunck)

            return newRows;
        });

        setRows(newRows)
    }

    const handleCountryChange = (event, countries) => {
        setCountry(countries);
    };

    const handelChangeRowsPage = (rowsPerPage) => {
        if (rowsPerPage !== -1) {
            rowsPerPage = rowsPerPage ? rowsPerPage : rowsCountPerPage;
        } else {
            rowsPerPage = tableRows.length;
        }

        generateTableRows(tableRows, rowsPerPage);
    };


    return (
        <div>
            <ErrorBoundary>
                <CountryPicker handleCountryChange={handleCountryChange} />
                <DataTable
                    columns={columns}
                    rows={rows}
                    rowsCountPerPage={rowsCountPerPage}
                    onChangeRowsPage={handelChangeRowsPage} />
            </ErrorBoundary>
        </div>
    )
}

export default SummaryPage
