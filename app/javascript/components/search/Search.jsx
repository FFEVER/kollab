import React from "react"
import PropTypes from "prop-types"

import {TextField, IconButton, InputAdornment} from "@material-ui/core"
import Button from "../shared/form/Button"
import profile1 from "../../images/profile/profile_1.jpeg"
import profile2 from "../../images/profile/profile_2.jpeg"
import profile3 from "../../images/profile/profile_3.jpeg"
import profile4 from "../../images/profile/profile_4.jpeg"

import ProjectCard from "./cards/ProjectCard"
import UserCard from "./cards/UserCard"

class Search extends React.Component {
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
        this.handleSearchSubmit()
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

    handleSearchSubmit(){

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
                {searchText !== "" ? (
                    <div className="search__project__section">
                        <p>{`${constProjects.length} results`}</p>
                    </div>
                ) : (
                    <div/>
                )}

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

Search.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    project: PropTypes.object,
    projects: PropTypes.array,
    users: PropTypes.array,
    searchPath: PropTypes.string,
    projectPath: PropTypes.string
}

export default Search
