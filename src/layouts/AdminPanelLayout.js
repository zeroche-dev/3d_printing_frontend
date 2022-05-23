import React, {useState } from "react";
import AdminNavbar from "../components/VerticalNavbar/AdminNavbar";
import AdminPanel from "../pages/Adminpanel/AdminPanel";
import {Icon, NavItem, NavLink} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faSignOutAlt, faTasks} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie/es6";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminPanelLayout = ({}) => {
    const [page, setPage] = useState("Dashboard");
   // const [lastPage, setLastPage] = useState("Dashboard"); ?
    const history = useHistory();
    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("jwt");
        history.replace("/");
    }
    const setSelectedItem = (_page) => {
        if(_page === page) return "light";
        else return "";
    }
    return(<>
            <AdminNavbar>
                <NavItem active={setSelectedItem("Dashboard")} ripple="light" onClick={e => setPage("Dashboard")}>
                    <Icon name="language" size="xl" />
                    Panel główny
                </NavItem>
                <NavLink active={setSelectedItem("Projects")} ripple="light" onClick={e => setPage("Projects")}>
                    <FontAwesomeIcon icon={faTasks} color="white" size="2x"></FontAwesomeIcon>
                    Projekty
                </NavLink>
                <NavItem ripple="light" active={setSelectedItem("GalleryManagement")} onClick={e => setPage("GalleryManagement")}>
                    <FontAwesomeIcon icon={faImage} color="white" size="2x"></FontAwesomeIcon>
                    Galeria projektów
                </NavItem>
                <NavItem ripple="light" onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} color="white" size="2x"></FontAwesomeIcon>
                    Wyloguj się
                </NavItem>
            </AdminNavbar>
            <main className="dashboard_section">
                <AdminPanel page={page}>
                </AdminPanel>
            </main>
            <footer className="dashboard_footer">
                <p> Developed by <a target="_blank" href="https://github.com/byko-dev" rel="noreferrer">byko-dev</a> & <a target="_blank"  href="https://github.com/zeroche-dev">zeroche-dev</a> 2021</p>
            </footer>
    </>);
}
export default AdminPanelLayout;