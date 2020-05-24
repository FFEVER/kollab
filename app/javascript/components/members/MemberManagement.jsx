import React from "react"
import PropTypes from "prop-types"
import MemberCard from "./cards/MemberCard"
import RoleCard from "./cards/RoleCard"
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
      members: [],
      roles: [],
      defaultUsers: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      members: constMembers,
      roles: constRoles,
      defaultUsers: defaultUsers,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser } = this.props
    const { members, roles, defaultUsers } = this.state
    console.log("State ", this.state)
    console.log("Props ", this.props)
    return (
      <div className="setting">
        <div className="setting__section">
          <h2>Memmbers</h2>
          {members.map((item, index) => (
            <MemberCard
              key={index}
              user={item}
              role={roles.find((r) => r.id === item.roleId)}
            />
          ))}
        </div>

        <div className="setting__section">
          <h2>Roles</h2>
          {roles.map((item, index) => (
            <RoleCard key={index} role={item} />
          ))}
          <p className="mt-2" style={{ color: "#54bdc2", alignSelf: "center" }}>
            Add Roles
          </p>
        </div>
        <div className="setting__section">
          <h2>Waiting lists</h2>
          {defaultUsers.map((item, index) => (
            <WaitListCard key={index} user={item} />
          ))}
        </div>

        <div className="setting__section">
          <h2>Pending</h2>
          {defaultUsers.map((item, index) => (
            <PendingCard key={index} user={item} />
          ))}
        </div>
        <div className="setting__section">
          <h2>Suggested teammates</h2>
          {defaultUsers.map((item, index) => (
            <SuggestMemberCard key={index} user={item} />
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
}

export default MemberManagement
