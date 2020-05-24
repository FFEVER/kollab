import React from "react"
import PropTypes from "prop-types"

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
    status: "Close",
  },
  {
    id: 2,
    name: "React Developer",
    fieldIds: [3, 4],
    fields: ["React", "JavaScript"],
    skillIds: [3, 4],
    skills: ["FrontendDeveloper", "React"],
    descriotion: "- Develop frontend using React",
    status: "Close",
  },
  {
    id: 3,
    name: "Business Analyst",
    fieldIds: [5],
    fields: ["Business"],
    skillIds: [5],
    skills: ["BusinessAnalysis"],
    descriotion: "- Define business model",
    status: "Close",
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

class MemberManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      roles: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      members: constMembers,
      roles: constRoles,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser } = this.props
    const { memmbers, roles } = this.state
    console.log("State ", this.state)
    console.log("Props ", this.props)
    return
    ;<div></div>
  }
}

MemberManagement.propTypes = {
  authenticityToken: PropTypes.string,
  submitPath: PropTypes.string,
  currentUser: PropTypes.object,
}

export default MemberManagement
