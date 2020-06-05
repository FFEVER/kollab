import React from "react"
import PropTypes from "prop-types"
import NotificationCard from "./cards/NotificationCard"

const constNotifications = [
    {
        id: 1,
        user: {
            first_name: "Tharita",
            last_name: "Tipdecho",
        },
        project: {
            title: "Music for fun",
        },
        action: "invite",
    },
    {
        id: 2,
        user: {
            first_name: "Kasamabhorn",
            last_name: "Suparerkrat",
        },
        project: {
            title: "Gardening robot",
        },
        action: "accept",
    },
    {
        id: 3,
        user: {
            first_name: "Nattaphol",
            last_name: "Srisa",
        },
        project: {
            title: "Mini vacuum cleaner",
        },
        action: "invite",
    },
]

class Notification extends React.Component {
    render() {
        const {joinRequests, authenticityToken} = this.props
        console.log(this.props)
        return (
            <div className="notification">
                <h3>Notifications</h3>
                {joinRequests.map((request, index) => (
                    <NotificationCard request={request} authenticityToken={authenticityToken} key={index}/>
                ))}
            </div>
        )
    }
}

Notification.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    joinRequests: PropTypes.array
}

export default Notification
