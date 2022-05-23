import React, {useEffect} from "react";
import "@material-tailwind/react/tailwind.css";
import H3 from "@material-tailwind/react/Heading3";
import H5 from "@material-tailwind/react/Heading5";
import Contact from "../sections/Contact/Contact";
import MainHero from "../components/MainHero/mainHero";
import Gallery from "../sections/Gallery/Gallery";

import StepByStep from "../sections/StepByStep/StepByStep";
import Upload from "../sections/Upload/Upload";


const Home = () =>{
    return(
        <section>
            <MainHero />
            <StepByStep />
            <Upload />
            <Gallery />
            <Contact />
        </section>
    )
}

export default Home;