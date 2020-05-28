import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import { TextField, IconButton, InputAdornment } from "@material-ui/core"
import Button from "../shared/form/Button"

import ProjectCard from "./cards/ProjectCard"
import UserCard from "./cards/UserCard"

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

const constUsers = [
  {
    id: 1,
    name: "Kasamabhorn Suparerkrat",
    faculty: "Faculty of Engineering",
    description: "Hi! I'm a software engineering student!",
    skills: [
      { label: "Skill1", name: "skill_1" },
      { label: "Skill2", name: "skill_2" },
    ],
    following: true,
  },
  {
    id: 2,
    name: "Supichaya Boondol",
    faculty: "Faculty of Engineering",
    description: "Hi! I'm a software engineering student!",
    skills: [
      { label: "Skill3", name: "skill_3" },
      { label: "Skill4", name: "skill_4" },
    ],
    following: false,
  },
  {
    id: 3,
    name: "Nattaphol Srisa",
    faculty: "Faculty of Engineering",
    description: "Hi! I'm a software engineering student!",
    skills: [
      { label: "Skill5", name: "skill_5" },
      { label: "Skill6", name: "skill_6" },
    ],
    following: true,
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
