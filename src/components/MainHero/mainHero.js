import React from 'react'
import {Button} from "@material-tailwind/react";
import timelapse from '../../assets/images/timelapse.mp4';
import Typical from 'react-typical';
import H3 from "@material-tailwind/react/Heading3";
import H1 from "@material-tailwind/react/Heading1";
import { scrollToId } from '../../Utils/UtilFunctions';
import { Image } from '@material-tailwind/react';
import logo from '../../assets/images/logo.png'


const MainHero = () => {
    return  (<>            
    <div className="banner flex-column-center">
    <div className="banner-hiding-parent">
            <div className="banner-video-overlay"/>
            <video src={timelapse} autoPlay loop playsInline muted poster="true" width="100%" height="500px">     
            </video>
       
        </div>
        <div className="banner-hero flex-column-center">
            <Image src={logo} className="logo" onClick={() => {window.location.href = "/"}} style={{height: "102px"}} alt="Kamil3D logo"></Image>
            <div className="banner-hero-slogan"> 
                <H1 color="white"> <Typical steps={['Szukasz druku 3D lub obróbki CNC ?', 5000, 'Zrealizuj swoje projekty!', 5000]} loop={Infinity}/></H1>
            </div>
            <H3 color="white"> Zamów swój projekt już dziś!</H3>
            <Button
                color="red"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                style={{marginTop:"2em"}}
                onClick={()=>scrollToId("order")}>
                Zaczynamy!
            </Button>
        </div>
    </div>
    <div className="triangle"></div></>);
}
export default MainHero;