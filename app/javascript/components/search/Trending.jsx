import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import ProjectCard from "./cards/ProjectCard"

const constProjects = [
  {
    id: 1,
    title: "Pet feeder",
    description: "A pet feeder machine controlled by a mobile application",
    tags: [
      { label: "Machine", name: "tag1" },
      { label: "MobileApp", name: "tag2" },
    ],
    status: "In progress",
    last_updated: "1 hour ago",
    lookingRoles: [
      "JavaScript Developer",
      "UX/UI Designer",
      "Ruby on Rails Developer",
    ],
    starred: true,
  },
  {
    id: 2,
    title: "Garden carer",
    description: "A machine that take care my garden when I'm away",
    tags: [
      { label: "WebApp", name: "tag1" },
      { label: "Engineering", name: "tag2" },
    ],
    status: "Completed",
    last_updated: "2 days ago",
    lookingRoles: ["Machine Developer", "Web Developer"],
    starred: false,
  },
  {
    id: 3,
    title: "Music for fun",
    description: "Create a funny music tone by using pet sounds",
    tags: [
      { label: "Music", name: "tag5" },
      { label: "Veterinarian", name: "tag6" },
    ],
    status: "On Hold",
    last_updated: "2 weeks ago",
    lookingRoles: ["Musician", "Business Analyse"],
    starred: true,
  },
  {
    id: 4,
    title: "Dating App",
    description: "App similar to Tinder",
    tags: [
      { label: "MobileApp", name: "tag7" },
      { label: "Matching", name: "tag8" },
    ],
    status: "Initiating",
    last_updated: "1 month ago",
    lookingRoles: ["Python Developer", "Business Analyse"],
    starred: true,
  },
  {
    id: 5,
    title: "Business for homeless",
    description: "project desction 3",
    tags: [
      { label: "Business", name: "tag9" },
      { label: "Freedom", name: "tag10" },
    ],
    status: "Cancelled",
    last_updated: "2 weeks ago",
    lookingRoles: ["Business analyse", "Accountant"],
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
