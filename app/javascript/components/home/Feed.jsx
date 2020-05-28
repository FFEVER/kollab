import React from "react"
import PropTypes from "prop-types"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import Button from "../shared/form/Button"

import anya from "../../images/anya.jpg"

import UpdateProjectCard from "./cards/UpdateProjectCard"
import StarProjectCard from "./cards/StarProjectCard"
import FollowUserCard from "./cards/FollowUserCard"

const starProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: anya },
    project: {
      title: "Project 1",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
    img: anya,
  },
  {
    id: 2,
    user: { first_name: "Tharita", last_name: "Tipdecho", img: anya },
    project: {
      title: "Project 2",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
  },
]

const updateProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: anya },
    action: "Update project status",
    statuses: { previous: "Initiating", currentStatus: "In progress" },
    // message: "Nearly finish!",
    project: {
      title: "Update Project 1",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
    time: "Tue 9 Dec 2019",
  },
  {
    id: 2,
    user: { first_name: "Nattaphol", last_name: "Srisa", img: anya },
    action: "Post project status",
    message: "Get stuck on the machine part .__.",
    project: {
      title: "Update Project 2",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
    time: "Wed 17 Dec 2019",
  },
]

const followUsers = [
  {
    id: 1,
    user: { first_name: "Somphong", last_name: "Prarinyajai", img: anya },
    target: { first_name: "Parawee", last_name: "Peesuksan", img: anya },
  },
  {
    id: 2,
    user: { first_name: "Kanyapa", last_name: "Sririsan", img: anya },
    target: { first_name: "Pansita", last_name: "Asakorn", img: anya },
  },
]

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { currentUser } = this.props
    const {} = this.state
    return (
      <div className="home">
        <StarProjectCard post={starProjects[0]} />
        <FollowUserCard post={followUsers[0]} />
        <UpdateProjectCard post={updateProjects[0]} />
        <FollowUserCard post={followUsers[1]} />
        <UpdateProjectCard post={updateProjects[1]} />
        <StarProjectCard post={starProjects[1]} />
      </div>
    )
  }
}

Feed.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.object,
  project: PropTypes.object,
}

export default Feed
