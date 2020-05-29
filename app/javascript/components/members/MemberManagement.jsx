import React from "react"
import PropTypes from "prop-types"
import MemberCard from "./cards/MemberCard"
import RoleCard from "./cards/RoleCard"
import WaitListCard from "./cards/WaitListCard"
import PendingCard from "./cards/PendingCard"
import SuggestMemberCard from "./cards/SuggestMemberCard"

import profile1 from "../../images/profile/profile_1.jpeg"
import profile2 from "../../images/profile/profile_2.jpeg"
import profile3 from "../../images/profile/profile_3.jpeg"
import profile4 from "../../images/profile/profile_4.jpeg"
import profile5 from "../../images/profile/profile_5.jpeg"
import profile6 from "../../images/profile/profile_6.jpeg"

const constMembers = [
  {
    id: 1,
    name: "Nathaphol Srisa",
    roleId: 1,
    role: "Ruby Developer",
    owner: true,
    image: profile3,
  },
  {
    id: 2,
    name: "Supichaya Boondol",
    roleId: 2,
    role: "React Developer",
    owner: true,
    image: profile1,
  },
  {
    id: 3,
    name: "Kasamabhorn Suparerkrat",
    roleId: 3,
    role: "Business Analyst",
    owner: false,
    image: profile2,
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

const waitingUsers = [
  {
    id: 1,
    name: "Srisamorn Nualjan",
    expertise: ["Computer Science"],
    faculty: "Faculty of Science",
    image: profile1,
  },
  {
    id: 2,
    name: "Malaya palawee",
    expertise: ["Painting"],
    faculty: "Faculty of Art",
    image: profile2,
  },
]

const pendingUsers = [
  {
    id: 1,
    name: "Tharita Tipdecho",
    expertise: ["Software Engineering"],
    faculty: "Faculty of Science",
    image: profile4,
  },
  {
    id: 2,
    name: "Suttipong Sedsart",
    expertise: ["Architecture"],
    faculty: "Faculty of Architecture",
    image: profile3,
  },
]
const suggestUsers = [
  {
    id: 1,
    name: "Kiatetisak Arjhan",
    expertise: ["Mathematics"],
    faculty: "Faculty of Science",
    image: profile5,
  },
  {
    id: 2,
    name: "Suttipong Ngamdee",
    expertise: ["Software Engineering"],
    faculty: "Faculty of Engineering",
    image: profile6,
  },
]

class MemberManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      roles: [],
      // defaultUsers: [],
    }

    this.memberDetail = this.memberDetail.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      members: constMembers,
      roles: constRoles,
      // defaultUsers: defaultUsers,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  memberDetail() {
    console.log("Show member detail")
  }

  render() {
    const { currentUser } = this.props
    const { members, roles, defaultUsers } = this.state
    return (
      <div>
        <div className="setting__member__section">
          <div className="setting__member__title">
            <h2>Memmbers</h2>
          </div>
          {members.map((item, index) => (
            <MemberCard
              key={index}
              user={item}
              role={roles.find((r) => r.id === item.roleId)}
              onClick={this.memberDetail}
            />
          ))}
        </div>

        <div className="setting__member__section">
          <div className="setting__member__title">
            <h2>Roles</h2>
          </div>
          {roles.map((item, index) => (
            <RoleCard key={index} role={item} />
          ))}
          <p className="mt-2" className="link align-self-center">
            Add Roles
          </p>
        </div>
        <div className="setting__member__section">
          <div className="setting__member__title">
            <h2>Waiting lists</h2>
          </div>
          {waitingUsers.map((item, index) => (
            <WaitListCard key={index} user={item} />
          ))}
        </div>

        <div className="setting__member__section">
          <div className="setting__member__title">
            <h2>Pending</h2>
          </div>
          {pendingUsers.map((item, index) => (
            <PendingCard key={index} user={item} />
          ))}
        </div>
        <div className="setting__member__section">
          <div className="setting__member__title">
            <h2>Suggested teammates</h2>
          </div>
          {suggestUsers.map((item, index) => (
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
  memmbers: PropTypes.any,
}

export default MemberManagement
