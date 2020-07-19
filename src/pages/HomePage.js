import React, { useState, useEffect } from "react";
import { getSummary, getHistoricalData } from "services/api";
import { GlobalInfoChart, TimeSeriesChart } from 'components/Charts'
import { ChartWrapper, HomeContainer } from 'styled/Container';

function HomePage() {
    const [globalInfo, setGlobalInfo] = useState([]);
    const [historicalData, setHistoricalData] = useState({});

    useEffect(() => {
        (async () => {
            const data = await getHistoricalData(90);
            setHistoricalData(data);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const data = await getSummary();
            setGlobalInfo(data['Global']);
        })()
    }, []);


    return (
        <HomeContainer>
            <ChartWrapper>
                <TimeSeriesChart data={historicalData} />
            </ChartWrapper>
            <ChartWrapper>
                <GlobalInfoChart data={globalInfo} />
            </ChartWrapper>
        </HomeContainer>
    )
}

export default HomePage
