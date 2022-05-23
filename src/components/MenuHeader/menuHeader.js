import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faSnapchat, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { Image } from "@material-tailwind/react";
import logo from '../../assets/images/logo.png'

const MenuHeader = ({handlePageChanged}) => {
    return ( 
    <nav className="navi">
        <input id="nav-burger" type="checkbox"></input>
        <div className="navi-item navi-icon">
          {/* <img style={{marginTop: "0"}}src={logo} height="30px"/> */}
          <Image src={logo} className="logo" onClick={() => {window.location.href = "/"}}  style={{height: "40px"}} alt="Kamil3D logo"></Image>
           <label htmlFor="nav-burger">
                    <div className="navi-item-burger" onClick={()=>{}}>
                        <i className="fas fa-bars"></i>
                    </div>
            </label>
        </div>
        <div className="navi-refs">
            <div className="navi-item navi-button" onClick={() => handlePageChanged('order', true)}>
                Zamów
            </div>
            <div className="navi-item navi-button" onClick={() => handlePageChanged('contact', true)}>
                Kontakt
            </div>
            <div className="navi-item navi-button" onClick={() => handlePageChanged('projects', true)}>
                Projekty
            </div>
            <div className="navi-item navi-button" onClick={() => handlePageChanged('faq', true)}>
                FAQ
            </div>
            <div className="navi-item navi-button" alt="social media" onClick={() => {}}>
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faSnapchat}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </div>
        </div>
    </nav>);
}
export default MenuHeader;