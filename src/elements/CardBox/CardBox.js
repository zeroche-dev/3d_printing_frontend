import {Card, CardHeader, CardRow, CardStatus, CardStatusFooter, Icon} from "@material-tailwind/react";

export default function CardBox({color, icon, title, amount, percentage, percentageColor, percentageIcon, date, children}) {

    const cardBoxContainer ={
        width: "350px",
        height: "auto",
        marginTop: "50px"
    }

    return (
        <div style={cardBoxContainer}>
            <Card>
                <CardRow>
                    <CardHeader color={color} iconOnly className="mb-0">
                        {children? children: <Icon name={icon} size="3xl" color="white" />}
                    </CardHeader>

                    <CardStatus title={title} amount={amount} />
                </CardRow>

                <CardStatusFooter
                    amount={percentage}
                    color={percentageColor}
                    date={date}
                >
                    <Icon color={percentageColor} name={percentageIcon} />
                </CardStatusFooter>
            </Card>
        </div>
    );
}