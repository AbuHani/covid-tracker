import styled from 'styled-components';
import { CountryPicker } from 'components';

export const Container = styled.div` width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;`

export const HomeContainer = styled.div` display: grid;
align-items: center;
grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
height: calc(100vh - 112px);`

export const ChartWrapper = styled.div`
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr; `

export const CountrytWrapper = styled(CountryPicker)`
display: flex;
width: 100%;
margin-bottom: 20px;
justify-content: flex-end;`

