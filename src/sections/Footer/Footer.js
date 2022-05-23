import React from "react";
import { Paragraph } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faSnapchat, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { scrollToId } from "../../Utils/UtilFunctions";

const Footer = () => {
    return(<>
    <footer className="footer-section">
        <div className="footer-triangle"/>
        <div className="footer-inner">
            <div className="footer-item">
                <p onClick={()=>scrollToId("projects")}>Projekty</p>
                <p onClick={()=>scrollToId("order")}>Zamów</p>
                <p onClick={()=>scrollToId("contact")}>Kontakt</p>
            </div>
            <div className="footer-social">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faSnapchat}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </div>
            <div className="footer-item">
                <p onClick={()=>scrollToId("faq")}>FAQ</p>
                <a href="#">Regulamin</a>
            </div>
        </div>
        <p>Copyright © JarlSolutions {new Date().getFullYear()  }</p>
        {/*Dałem to tu tego żeby o tym nie zapmnieć*/}
        <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy </a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
    </footer>
    </>)
}
export default Footer;