import React from "react"
import PropTypes from "prop-types"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import Button from "../shared/form/Button"

import anya from "../../images/anya.jpg"
import profile1 from "../../images/profile/profile_1.jpeg"
import profile2 from "../../images/profile/profile_2.jpeg"
import profile3 from "../../images/profile/profile_3.jpeg"
import profile4 from "../../images/profile/profile_4.jpeg"
import profile5 from "../../images/profile/profile_5.jpeg"

import UpdateProjectCard from "./cards/UpdateProjectCard"
import StarProjectCard from "./cards/StarProjectCard"
import FollowUserCard from "./cards/FollowUserCard"

const starProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: profile1 },
    project: {
      title: "Pet feeder",
      description: "A pet feeder machine controlled by a mobile application",
      tags: [
        { label: "Machine", name: "tag1" },
        { label: "MobileApp", name: "tag2" },
      ],
    },
    img: anya,
  },
  {
    id: 2,
    user: { first_name: "Tharita", last_name: "Tipdecho", img: profile2 },
    project: {
      title: "Garden carer",
      description: "A machine that take care my garden when I'm away",
      tags: [
        { label: "WebApp", name: "tag1" },
        { label: "Engineering", name: "tag2" },
      ],
    },
  },
]

const updateProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: profile1 },
    action: "Update project status",
    statuses: { previous: "Initiating", currentStatus: "In progress" },
    // message: "Nearly finish!",
    project: {
      title: "Simple rice cooker",
      description: "A small rice cooker made by arduino",
      tags: [
        { label: "Arduino", name: "tag1" },
        { label: "Cooking", name: "tag2" },
      ],
    },
    time: "Tue 9 Dec 2019",
  },
  {
    id: 2,
    user: { first_name: "Nattaphol", last_name: "Srisa", img: profile3 },
    action: "Post project status",
    message: "Get stuck on the machine part .__.",
    project: {
      title: "Ruby web and python libraries",
      description: "Make a simple app using ruby language and python libraries",
      tags: [
        { label: "RubyAndPython", name: "tag1" },
        { label: "ProgrammingLanguages", name: "tag2" },
      ],
    },
    time: "Wed 17 Dec 2019",
  },
]

const followUsers = [
  {
    id: 1,
    user: { first_name: "Somphong", last_name: "Prarinyajai", img: profile5 },
    target: { first_name: "Parawee", last_name: "Peesuksan", img: profile4 },
  },
  {
    id: 2,
    user: { first_name: "Kanyapa", last_name: "Sririsan", img: anya },
    target: { first_name: "Pansita", last_name: "Asakorn", img: profile2 },
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
