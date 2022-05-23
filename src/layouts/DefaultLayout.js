import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MenuHeader from '../components/MenuHeader/menuHeader';
import { scrollToId } from '../Utils/UtilFunctions';
import Footer from "../sections/Footer/Footer";

const DefaultLayout = ({ children, className: background }) => {

    const history = useHistory();
    const pageChangedHandler = (page, scroll) => scroll ? scrollToId(page) : history.push(page);
    return(
        <>
            <MenuHeader handlePageChanged={(page, scroll)=> pageChangedHandler(page, scroll)}/>
            <main>
                {children}
            </main>
            <Footer />
        </>
    );}

export default DefaultLayout;



