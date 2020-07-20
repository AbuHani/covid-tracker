import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core';
import { DataTable, ErrorBoundary } from 'components';
import { CountrytWrapper } from 'styled/Container';
import { getSummary } from 'services/api'
import { chunck, getMaxHeight } from 'utils';

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
    const [countries, setCountries] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [rowsCountPerPage, setRowsCountPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    const generateTableRows = useCallback(
        () => {
            const countriesCopy = JSON.parse(JSON.stringify(countries));
            let data = countriesCopy.reduce(
                (items, item) => {
                    items.push(createRowData(item))
                    return items;
                }, []);

            if (selectedCountries.length) {
                data = data.reduce((acc, row) => {
                    const item = selectedCountries.find(country => row.id === country.ISO2);
                    if (item) {
                        acc.push(row);
                    }
                    return acc;
                }, []);
            }

            if (data.length === 1) {
                return setRows(data);
            }

            const chuncks = chunck(data, rowsCountPerPage);
            const tableRows = chuncks.reduce((arr, chunck) => {
                const hRecoveredRow = getMaxHeight(chunck, 'totalRecovered');
                const hDeathsRow = getMaxHeight(chunck, 'newDeaths');
                const hConfirmedRow = getMaxHeight(chunck, 'newConfirmed');

                hRecoveredRow.totalRecovered.style = classes.green;
                hDeathsRow.newDeaths.style = classes.red;
                hConfirmedRow.newConfirmed.style = classes.yellow;
                arr.push(...chunck)

                return arr;
            }, []);
            setRows(tableRows)
        },
        [classes, countries, selectedCountries, rowsCountPerPage],
    );

    // https://github.com/facebook/react/issues/15865
    const onInit = () => {
        (async () => {
            const data = await getSummary();
            setCountries(data['Countries'])
        })()
    }
    useEffect(onInit, []);

    // https://github.com/facebook/react/issues/15865
    const tableEffect = () => {
        generateTableRows();
    }

    useEffect(tableEffect, [classes, countries, selectedCountries, rowsCountPerPage]);


    const handleCountryChange = (event, countries) => {
        setSelectedCountries(countries);
    };

    const handelChangeRowsPage = (rowsPerPage) => {
        if (rowsPerPage === -1) {
            rowsPerPage = countries.length;
        }
        setRowsCountPerPage(rowsPerPage);
    };


    return (
        <div>
            <CountrytWrapper handleCountryChange={handleCountryChange} />
            <ErrorBoundary>
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
