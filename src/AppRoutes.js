import HomePage from 'pages/HomePage';
import SummaryPage from 'pages/SummaryPage';

const Routes = [
    {
        path: '/',
        sidebarName: 'Home',
        component: HomePage
    },
    {
        path: '/summary',
        sidebarName: 'Summary',
        component: SummaryPage
    }
];

export default Routes;
