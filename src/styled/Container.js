import styled from 'styled-components';

export const Container = styled.div` width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;`

export const HomeContainer = styled.div` display: grid;
align-items: center;
grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));`

export const ChartWrapper = styled.div`
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr; `
