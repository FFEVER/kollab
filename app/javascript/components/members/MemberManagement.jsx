import React from "react"
import PropTypes from "prop-types"
import WaitListCard from "./cards/WaitListCard"
import PendingCard from "./cards/PendingCard"
import SuggestMemberCard from "./cards/SuggestMemberCard"

const constMembers = [
    {
        id: 1,
        name: "Nathaphol Srisa",
        roleId: 1,
        role: "Ruby Developer",
        owner: true,
    },
    {
        id: 2,
        name: "Supichaya Boondol",
        roleId: 2,
        role: "React Developer",
        owner: true,
    },
    {
        id: 3,
        name: "Kasamabhorn Suparerkrat",
        roleId: 3,
        role: "Business Analyst",
        owner: false,
    },
]
// Role : Name, Fields, Skill, Description, Status
const constRoles = [
    {
        id: 1,
        name: "Ruby Developer",
        fieldIds: [1, 2],
        fields: ["Ruby", "Rails"],
        skillIds: [1, 2],
        skills: ["BackendDeveloper", "RoR"],
        descriotion: "- Develop backend using ROR",
        status: "Closed",
    },
    {
        id: 2,
        name: "React Developer",
        fieldIds: [3, 4],
        fields: ["React", "JavaScript"],
        skillIds: [3, 4],
        skills: ["FrontendDeveloper", "React"],
        descriotion: "- Develop frontend using React",
        status: "Closed",
    },
    {
        id: 3,
        name: "Business Analyst",
        fieldIds: [5],
        fields: ["Business"],
        skillIds: [5],
        skills: ["BusinessAnalysis"],
        descriotion: "- Define business model",
        status: "Closed",
    },
    {
        id: 4,
        name: "UX/UI Design",
        fieldIds: [6],
        fields: ["Design"],
        skillIds: [6],
        skills: [],
        descriotion: "- Design UI for the website",
        status: "Open",
    },
]

const defaultUsers = [
    {
        id: 1,
        name: "Tharita Yoyo",
        expertise: ["Software Engineering"],
        faculty: "Faculty of Engineering",
    },
    {
        id: 2,
        name: "Panupong Eiei",
        expertise: ["Software Engineering"],
        faculty: "Faculty of Engineering",
    },
]

class MemberManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingRequests: this.props.waitingRequests,
            invitingRequests: this.props.invitingRequests
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const {currentUser, authenticityToken} = this.props
        const {invitingRequests, waitingRequests} = this.state
        return (
            <div>
                <div className="setting__member__section">
                    <h4>Waiting requests</h4>
                    {waitingRequests.map((request, index) => (
                        <WaitListCard key={index} request={request} authenticityToken={authenticityToken}/>
                    ))}
                    {waitingRequests.length === 0 ? "No join request." : null}
                </div>

                <div className="setting__member__section">
                    <h4>Inviting members</h4>
                    {invitingRequests.map((request, index) => (
                        <PendingCard key={index} request={request} authenticityToken={authenticityToken}/>
                    ))}
                    {invitingRequests.length === 0 ? "No invitation." : null}
                </div>

                <div className="setting__member__section">
                    <h4>Suggested teammates</h4>
                    {defaultUsers.map((request, index) => (
                        <SuggestMemberCard key={index} user={request} authenticityToken={authenticityToken}/>
                    ))}
                </div>
            </div>
        )
    }
}

MemberManagement.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    projectMembers: PropTypes.array,
    waitingRequests: PropTypes.array,
    invitingRequests: PropTypes.array
}

export default MemberManagement
