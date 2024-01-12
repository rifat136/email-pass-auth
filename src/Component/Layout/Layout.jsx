import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
    return (
        <div>
            <div className='flex justify-center'>
            <Header></Header>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;