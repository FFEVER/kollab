import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import ProjectCard from "./cards/ProjectCard"

const constProjects = [
  {
    id: 1,
    title: "Project 1",
    description: "project desction 1",
    tags: [
      { label: "tag1", name: "tag1" },
      { label: "tag2", name: "tag2" },
    ],
    status: "In progress",
    last_updated: "1 hour ago",
    lookingRoles: [
      "JavaScript Developer",
      "Accountant",
      "UX/UI Designer",
      "RoR Developer",
    ],
    starred: true,
  },
  {
    id: 2,
    title: "Project 2",
    description: "project desction 1",
    tags: [
      { label: "tag3", name: "tag3" },
      { label: "tag4", name: "tag4" },
    ],
    status: "Completed",
    last_updated: "2 days ago",
    lookingRoles: ["Python Developer", "RoR Developer"],
    starred: false,
  },
  {
    id: 3,
    title: "Project 3",
    description: "project desction 3",
    tags: [
      { label: "tag5", name: "tag5" },
      { label: "tag6", name: "tag6" },
    ],
    status: "On Hold",
    last_updated: "2 weeks ago",
    lookingRoles: ["Java Developer", "Business Analyse"],
    starred: true,
  },
  {
    id: 4,
    title: "Project 4",
    description: "project desction 3",
    tags: [
      { label: "tag7", name: "tag7" },
      { label: "tag8", name: "tag8" },
    ],
    status: "Initiating",
    last_updated: "1 month ago",
    lookingRoles: ["Python Developer", "Business Analyse"],
    starred: true,
  },
  {
    id: 5,
    title: "Project %",
    description: "project desction 3",
    tags: [
      { label: "tag9", name: "tag9" },
      { label: "tag10", name: "tag10" },
    ],
    status: "Cancelled",
    last_updated: "2 weeks ago",
    lookingRoles: ["Java Developer", "Business Analyse"],
    starred: false,
  },
]

class Explore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  setIsButtonLoading(isLoading) {
    this.setState({ isButtonLoading: isLoading })
  }

  render() {
    const { currentUser } = this.props
    const { name } = this.state
    return (
      <div className="d-flex flex-column">
        {constProjects.map((item, index) => (
          <ProjectCard project={item} key={index} />
        ))}
      </div>
    )
  }
}

Explore.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.object,
  project: PropTypes.object,
}

export default Explore
