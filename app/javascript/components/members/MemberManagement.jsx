import React from "react"
import PropTypes from "prop-types"
import MemberCard from "./cards/MemberCard"
import RoleCard from "./cards/RoleCard"
import WaitListCard from "./cards/WaitListCard"
import PendingCard from "./cards/PendingCard"
import SuggestMemberCard from "./cards/SuggestMemberCard"
import Button from "../shared/form/Button"

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
            members: [],
            roles: [],
            defaultUsers: [],
        }

        this.handleChange = this.handleChange.bind(this)
        // this.handleNavigation = this.handleNavigation.bind(this)
    }

    componentDidMount() {
        let members = []
        let roles = []
        console.log("this props", this.props)
        this.props.memberRole.map((item) => {
            members.push(item.member)
            roles.push(item.role)
        })

        this.setState({
            members: members,
            roles: roles,
            defaultUsers: defaultUsers,
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleNavigation(route, item) {
        window.location.href = route
    }

    render() {
        const {currentUser, invitingRequests, waitingRequests} = this.props
        const {members, roles, defaultUsers} = this.state
        console.log("State ", this.state)
        console.log("Props ", this.props)
        return (
            <div>
                <div className="setting__member__section">
                    <h2>Waiting lists</h2>
                    {waitingRequests.map((request, index) => (
                        <WaitListCard key={index} user={request.user}/>
                    ))}
                    {waitingRequests.length === 0 ? "No join request." : null}
                </div>

                <div className="setting__member__section">
                    <h2>Pending</h2>
                    {invitingRequests.map((request, index) => (
                        <PendingCard key={index} user={request.user}/>
                    ))}
                    {invitingRequests.length === 0 ? "No invitation." : null}
                </div>

                <div className="setting__member__section">
                    <h2>Suggested teammates</h2>
                    {defaultUsers.map((request, index) => (
                        <SuggestMemberCard key={index} user={request}/>
                    ))}
                </div>
            </div>
        )
    }
}

MemberManagement.propTypes = {
    authenticityToken: PropTypes.string,
    submitPath: PropTypes.string,
    currentUser: PropTypes.object,
    projectMembers: PropTypes.array,
    memberRole: PropTypes.array,
    waitingRequests: PropTypes.array,
    invitingRequests: PropTypes.array
}

export default MemberManagement
