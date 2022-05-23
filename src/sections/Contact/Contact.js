import React, {useEffect, useState} from "react";
import "@material-tailwind/react/tailwind.css";
import Image from "@material-tailwind/react/Image";
import H2 from '@material-tailwind/react/Heading2';
import { Paragraph } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faSnapchat, faInstagram} from "@fortawesome/free-brands-svg-icons";
import sampleguy from '../../assets/images/sampleguy.jpg';
const Contact = () =>{
    useEffect(()=>{
    }, []);
    return(
        <section className="contact-container" id="contact">
            <header data-aos="zoom-in"  data-aos-duration="600">
                <H2>Skontakuj się z nami!</H2>
            </header>
            <div className="contact-inner">
                <div className="contact-wing " data-aos="zoom-in"  data-aos-duration="600">
                    <Paragraph> Tel: +48 538 421 365</Paragraph>
                    <hr></hr>
                </div>
                <div className="contact-middle-img" data-aos="zoom-in"  data-aos-duration="600">
                    <Image
                        src={sampleguy}
                        rounded={true}
                        raised={true}
                        alt="Rounded Raised Image"
                        
                    />
                </div>
                <div className="contact-wing" data-aos="zoom-in"  data-aos-duration="600">
                    <Paragraph>Email: kamil.kubat@protonmail.com</Paragraph>
                    <Paragraph>Adres: Grodzisko Górne 392G</Paragraph>
                    <hr></hr>
                </div>
            </div>
            <footer data-aos="zoom-in"  data-aos-duration="600">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faSnapchat}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </footer>
        </section>
    )
}
export default Contact;