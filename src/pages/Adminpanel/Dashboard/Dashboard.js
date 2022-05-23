import React, {useEffect, useState} from "react";
import CardBox from "../../../elements/CardBox/CardBox";
import SettingsForm from "../../../sections/SettingsForm";
import MailSettingsForm from "../../../sections/MailSettingsForm";

const Dashboard = () => {
    useEffect(()=>{

    }, []);

    return(
        <>
            <div className="dashboard_cards_container">
                <CardBox
                    color="pink"
                    icon="trending_up"
                    title="Traffic"
                    amount="350,897"
                    percentage="3.48"
                    percentageIcon="arrow_upward"
                    percentageColor="green"
                    date="Since last month"
                />
                <CardBox
                    color="orange"
                    icon="groups"
                    title="New Users"
                    amount="2,356"
                    percentage="3.48"
                    percentageIcon="arrow_downward"
                    percentageColor="red"
                    date="Since last week"
                />
                <CardBox
                    color="purple"
                    icon="paid"
                    title="Sales"
                    amount="924"
                    percentage="1.10"
                    percentageIcon="arrow_downward"
                    percentageColor="orange"
                    date="Since yesterday"
                />
                <CardBox
                    color="blue"
                    icon="poll"
                    title="Performance"
                    amount="49,65%"
                    percentage="12"
                    percentageIcon="arrow_upward"
                    percentageColor="green"
                    date="Since last month"
                />


            </div>

            <div className="dashboard_settings_container">
                <SettingsForm className="dashboard_settings"> </SettingsForm>
                <MailSettingsForm className="dashboard_settings"> </MailSettingsForm>
            </div>
        </>
    )
}

export default Dashboard;