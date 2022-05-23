import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { scrollToId } from '../Utils/UtilFunctions';
import UserNavbar from '../components/UserNavbar/UserNavbar';

const UserPanelLayout = ({ children, className: background }) => {

    const history = useHistory();
    const pageChangedHandler = (page, scroll) => {
        if(scroll){
            scrollToId(page);
        }else {
        history.replace(page);
        }
    }
    return(
        <>
            <UserNavbar handlePageChanged={(page, scroll)=> pageChangedHandler(page, scroll)}/>
            <main>
                {children}
            </main>
        </>
    );}

export default UserPanelLayout;