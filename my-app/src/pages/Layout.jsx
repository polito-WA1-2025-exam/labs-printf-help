import React from 'react';

import NavbarComponent from '../components/layouts/NavbarComponent';

import { Outlet } from 'react-router-dom';

const Layout = (props) => {
    return (
        <>
            <NavbarComponent isLoggedIn={props.isLoggedIn} onLogout={props.handleLogout} />
            <Outlet/>
            <footer>
                <p>&copy; 2023 My App. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;