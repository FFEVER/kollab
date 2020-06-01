import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import Button from "../shared/form/Button"
import profile1 from "../../images/profile/profile_1.jpeg"
import profile2 from "../../images/profile/profile_2.jpeg"
import profile3 from "../../images/profile/profile_3.jpeg"
import profile4 from "../../images/profile/profile_4.jpeg"

import ProjectCard from "./cards/ProjectCard"
import UserCard from "./cards/UserCard"

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

const constUsers = [
  {
    id: 1,
    name: "Kasamabhorn Suparerkrat",
    faculty: "Faculty of Medicine",
    description: "A medicine student who is glad to gain more friends",
    skills: [
      { label: "Medicine", name: "skill_1" },
      { label: "Doctor", name: "skill_2" },
    ],
    following: true,
    image: profile1,
  },
  {
    id: 2,
    name: "Supichaya Boondol",
    faculty: "Faculty of Engineering",
    description: "I'm a software engineering student!",
    skills: [
      { label: "Software", name: "skill_3" },
      { label: "Hardware", name: "skill_4" },
    ],
    following: false,
    image: profile2,
  },
  {
    id: 3,
    name: "Nattaphol Srisa",
    faculty: "Faculty of Science",
    description: "I'm a computer science student and I love computer games",
    skills: [
      { label: "DataVisualization", name: "skill_5" },
      { label: "DistributedComputing", name: "skill_6" },
    ],
    following: true,
    image: profile3,
  },
  {
    id: 4,
    name: "Tharita tipdecho",
    faculty: "Faculty of Art",
    description: "I'm an Artist and I like to talk with people",
    skills: [
      { label: "Drawing", name: "skill_3" },
      { label: "TeamCommunication", name: "skill_4" },
    ],
    following: false,
    image: profile4,
  },
]

class Explore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      searchText: "",
      selectType: "project",
    }

    this.selectType = this.selectType.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
  }

  selectType(type) {
    this.setState({ selectType: type })
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
    const { name, searchText, selectType } = this.state
    return (
      <div className="d-flex flex-column">
        <TextField
          id="search"
          className="search__bar"
          placeholder={`Search ${selectType}`}
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  // className={classes.iconButton}
                  aria-label="search"
                >
                  <i className="fas fa-search fa-search__textfield"></i>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="search__row mt-2">
          <Button
            name="project"
            className={`button search__button__type__${
              selectType === "project" ? "selected" : "deselected"
            } mr-2`}
            onClick={() => this.selectType("project")}
          >
            Project
          </Button>
          <Button
            name="people"
            className={`button search__button__type__${
              selectType === "people" ? "selected" : "deselected"
            }`}
            onClick={() => this.selectType("people")}
          >
            People
          </Button>
        </div>
        {searchText !== "" ? (
          <div className="search__project__section">
            <p>{`${constProjects.length} results`}</p>
          </div>
        ) : (
          <div />
        )}

        {selectType === "project"
          ? constProjects.map((item, index) => (
              <ProjectCard project={item} key={index} />
            ))
          : constUsers.map((item, index) => (
              <UserCard user={item} key={index} />
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
