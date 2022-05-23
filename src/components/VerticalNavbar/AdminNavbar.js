import React, {useState} from 'react'
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarContainer,
    NavbarToggler,
    NavbarWrapper
} from "@material-tailwind/react";

const AdminNavbar = ({children}) => {
    const [openNavbar, setOpenNavbar] = useState(false);

    return  (<Navbar color="lightBlue" navbar>
        <NavbarContainer>
            <NavbarWrapper>
                <NavbarBrand>Admin panel</NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
                <Nav>
                    {children}
                </Nav>
            </NavbarCollapse>
        </NavbarContainer>
    </Navbar>);
}
export default AdminNavbar;