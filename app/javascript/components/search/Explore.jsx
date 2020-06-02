import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

import {TextField, IconButton, InputAdornment} from "@material-ui/core"
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
        short_desc: "A pet feeder machine controlled by a mobile application",
        tags: ["Machine", "MobileApp"],
        status: "In progress",
        last_updated: "1 hour ago",
        looking_roles: [
            "JavaScript Developer",
            "UX/UI Designer",
            "Ruby on Rails Developer",
        ],
        starred: true,
    },
    {
        id: 2,
        title: "Garden carer",
        short_desc: "A machine that take care my garden when I'm away",
        tags: ["WebApp", "Engineering"],
        status: "Completed",
        last_updated: "2 days ago",
        looking_roles: ["Machine Developer", "Web Developer"],
        starred: false,
    },
    {
        id: 3,
        title: "Music for fun",
        short_desc: "Create a funny music tone by using pet sounds",
        tags: ["Music", "veterinarian"],
        status: "On Hold",
        last_updated: "2 weeks ago",
        looking_roles: ["Musician", "Business Analyse"],
        starred: true,
    },
    {
        id: 4,
        title: "Dating App",
        short_desc: "App similar to Tinder",
        tags: ["MobileApp", "Matching"],
        status: "Initiating",
        last_updated: "1 month ago",
        looking_roles: ["Python Developer", "Business Analyse"],
        starred: true,
    },
    {
        id: 5,
        title: "Business for homeless",
        short_desc: "project desction 3",
        tags: ["Business", "Freedom"],
        status: "Cancelled",
        last_updated: "2 weeks ago",
        looking_roles: ["Business analyse", "Accountant"],
        starred: false,
    },
]

const constUsers = [
    {
        id: 1,
        name: "Kasamabhorn Suparerkrat",
        faculty: "Faculty of Medicine",
        description: "A medicine student who is glad to gain more friends",
        skills: ["Medicine", "Doctor"],
        following: true,
        image: profile1,
    },
    {
        id: 2,
        name: "Supichaya Boondol",
        faculty: "Faculty of Engineering",
        description: "I'm a software engineering student!",
        skills: ["Software", "Hardware"],
        following: false,
        image: profile2,
    },
    {
        id: 3,
        name: "Nattaphol Srisa",
        faculty: "Faculty of Science",
        description: "I'm a computer science student and I love computer games",
        skills: ["DataVisualization", "DistributedComputing"],
        following: true,
        image: profile3,
    },
    {
        id: 4,
        name: "Tharita tipdecho",
        faculty: "Faculty of Art",
        description: "I'm an Artist and I like to talk with people",
        skills: ["Drawing", "TeamCommunincation"],
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
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }

    selectType(type) {
        this.setState({selectType: type})
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
    }

    handleSearchSubmit() {
        const searchPath = this.props.searchPath
        window.location.href = `${searchPath}?word=${this.state.searchText}`;
    }

    render() {
        const {currentUser, projects, users, searchPath, projectPath} = this.props
        const {name, searchText, selectType} = this.state
        return (
            <div className="d-flex flex-column">
                <TextField
                    id="search"
                    className="search__bar"
                    placeholder={`Search ${selectType}`}
                    type="search"
                    variant="outlined"
                    onChange={this.handleChange}
                    name="searchText"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    type="submit"
                                    // className={classes.iconButton}
                                    aria-label="search"
                                    onClick={this.handleSearchSubmit}
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

                {selectType === "project"
                    ? projects.map((item, index) => (
                        <ProjectCard project={item} key={index} projectPath={projectPath}/>
                    ))
                    : users.map((item, index) => (
                        <UserCard user={item} key={index}/>
                    ))}
            </div>
        )
    }
}

Explore.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    projects: PropTypes.array,
    users: PropTypes.array,
    searchPath: PropTypes.string,
    projectPath: PropTypes.string,
}

export default Explore
