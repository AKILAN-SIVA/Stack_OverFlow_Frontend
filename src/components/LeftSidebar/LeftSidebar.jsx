import React from 'react';
import './LeftSidebar.css';
import { NavLink } from 'react-router-dom';
import Globe from "../../assets/globe.png";

const LeftSidebar = () => {
    return (
        <div className='left-sidebar'>
            <nav className='side-nav'>
                <NavLink to="/" className='side-nav-links' activeClassName='active'>
                    <p>Home</p>
                </NavLink>
                <div className='side-nav-div'>
                    <div>
                        <p>PUBLIC</p>
                        <NavLink to="/Questions" className="side-nav-links" activeClassName="active">
                            <img width="15px" src={Globe} alt='Globe' />
                            <p style={{ paddingLeft: "10px" }}>Questions</p>
                        </NavLink>
                        <NavLink to="/Tags" style={{ paddingLeft: "40px" }} className="side-nav-links" activeClassName="active">
                            <p>Tags</p>
                        </NavLink>
                        <NavLink to="/Users" style={{ paddingLeft: "40px" }} className="side-nav-links" activeClassName="active">
                            <p>Users</p>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar