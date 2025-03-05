import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; 
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../../styles/header/Header.css'; 

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100); 
        };

        window.addEventListener('scroll', handleScroll);
        
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setIsAuthenticated(true);
            setUserType(parsedData.userType);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const getDashboardLink = () => {
        switch (userType) {
            case 'staff':
                return "/dashboard/staff";
            case 'employee':
                return "/dashboard/employee";
            case 'client':
                return "/dashboard/client";
            default:
                return "/dashboard"; 
        }
    };    

    return (
        <Navbar className={`navbar-custom ${scrolled ? 'scrolled' : 'transparent'} fixed-top`} expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
                        Project Management
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto"></Nav>

                    <Nav className="d-lg-none">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to={getDashboardLink()}>
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    <Nav className="d-none d-lg-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <Nav.Item>
                                    <NavLink to={getDashboardLink()} className="nav-link">
                                        Dashboard
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="#" className="nav-link">
                                        /
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <span 
                                        style={{ color: 'black', cursor: 'pointer', fontWeight: 'bold' }} 
                                        onClick={handleLogout}>
                                        Logout
                                    </span>
                                </Nav.Item>
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="#" className="nav-link">
                                        /
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink to="/register" className="nav-link">
                                        Register
                                    </NavLink>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;