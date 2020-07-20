import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, withRouter, Switch as SwitchRoute, Route } from 'react-router-dom';
import { MenuList, MenuItem } from '@material-ui/core';
import {
    grey,
    deepPurple
} from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Routes from 'AppRoutes';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    title: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const Navbar = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? grey[800] : deepPurple[500];
    const mainSecondaryColor = darkState ? grey[50] : deepPurple[500];
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });
    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const toggleDrawer = (open) => (
        event,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event).key === 'Tab' ||
                (event).key === 'Shift')
        ) {
            return;
        }

        setMobileOpen(open);
    };
    const activeRoute = (routeName) => {
        return props.location.pathname === routeName ? true : false;
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <div
                className={classes.fullList}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <MenuList>
                    {Routes.map((prop, key) => {
                        return (
                            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                                <MenuItem selected={activeRoute(prop.path)}>
                                    <ListItemText primary={prop.sidebarName} />
                                </MenuItem>
                            </NavLink>
                        );
                    })}
                </MenuList>
            </div>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            COVID-19
                        </Typography>
                        <small> Dark mode</small>
                        <Switch checked={darkState} onChange={handleThemeChange} />
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <SwitchRoute>
                        {Routes.map((route) => (
                            <Route exact path={route.path} key={route.path}>
                                <route.component />
                            </Route>
                        ))}
                    </SwitchRoute>
                </main>
            </div >
        </ThemeProvider>
    );
};

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default withRouter(Navbar);
