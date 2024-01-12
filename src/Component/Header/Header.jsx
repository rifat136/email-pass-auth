import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div>
            {/* <Link to="/">Layout</Link> */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/regi">Register</Link>
        </div>
    );
};

export default Header;