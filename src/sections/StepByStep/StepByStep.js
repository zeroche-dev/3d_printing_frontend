import React, {useEffect,} from "react";
import {Card, } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faArrowRight, faBoxOpen,
    faFileContract,
    faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import H2 from "@material-tailwind/react/Heading2";
import { Paragraph } from "@material-tailwind/react";
const StepByStep = () =>{
    useEffect(()=>{
    }, []);
    const Arrow = () => <div className="sbs-arrow" data-aos="zoom-in" data-aos-duration="600">
        <FontAwesomeIcon className="sbs-desktop-arrow" icon={faArrowRight} color="black"/>
        <FontAwesomeIcon className="sbs-mobile-arrow" icon={faArrowDown} color="black"/>
    </div>
    return(
        <section className="sbs-container" id="faq">
            <div className="sbs-heading"> 
                <H2>Jak złożyć zamówienie ?</H2>
            </div>
            <div className="sbs-inner">
                 <div className="sbs-item-outer" data-aos="zoom-in" data-aos-duration="600">
                <Card className="sbs-item">
                    <FontAwesomeIcon icon={faFileContract} style={{color: "rgb(49, 49, 48)"}} />
                        <Paragraph> Wyślij nam swój projekt 3D i opisz go szczegółowo w formularzu na dole! </Paragraph>
                </Card>
                </div>
                <Arrow/>
                <div className="sbs-item-outer" data-aos="zoom-in" data-aos-duration="600">
                <Card className="sbs-item" >
                        <FontAwesomeIcon icon={faHandshake} style={{color: "rgb(49, 49, 48)"}} />
                        <Paragraph> Otrzymaj darmową wycenę i ustal szczegóły projektu oraz płatności.
                        </Paragraph>
                </Card>
                </div>
                <Arrow/>
                <div className="sbs-item-outer" data-aos="zoom-in" data-aos-duration="600">
                    <Card className="sbs-item">
                        <FontAwesomeIcon icon={faBoxOpen} style={{color: "rgb(49, 49, 48)"}}  />
                        <Paragraph> Kontroluj status swojego swojego zamówienia!
                        </Paragraph>    
                    </Card>
                </div>
            </div>

        </section>
    )
}

export default StepByStep;