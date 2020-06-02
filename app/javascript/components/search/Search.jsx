import React from "react"
import PropTypes from "prop-types"

import {TextField, IconButton, InputAdornment} from "@material-ui/core"
import Button from "../shared/form/Button"

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
        this.submitSearch = this.submitSearch.bind(this)
        this.keyPress = this.keyPress.bind(this)
    }

    componentDidMount() {
        this.setState({
            searchText: this.props.searchWord,
            selectType: this.props.selectType
        })
    }

    selectType(type) {
        this.setState({selectType: type})
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    keyPress(e) {
        if (e.keyCode === 13) {
            this.submitSearch()
        }
    }

    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
    }

    submitSearch() {
        const searchPath = this.props.searchPath
        window.location.href = `${searchPath}?word=${this.state.searchText}&type=${this.state.selectType}`;
    }

    submitSearchTag = (tagName, parentType) => {
        const searchPath = this.props.searchPath
        window.location.href = `${searchPath}?word=${tagName}&type=${parentType}`;
    }

    render() {
        const {
            currentUser,
            projects,
            users,
            userPath,
            projectPath,
            followPath,
            unfollowPath,
            starPath,
            unstarPath,
            authenticityToken
        } = this.props

        const {searchText, selectType} = this.state

        return (
            <div className="d-flex flex-column">
                <TextField
                    id="search"
                    className="search__bar"
                    placeholder={`Search ${selectType}`}
                    type="search"
                    variant="outlined"
                    name="searchText"
                    value={searchText}
                    onChange={this.handleChange}
                    onKeyDown={this.keyPress}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    type="submit"
                                    // className={classes.iconButton}
                                    aria-label="search"
                                    onClick={this.submitSearch}
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

                <div className="search__project__section">
                    {selectType === "project"
                        ? <p>{`${projects.length} results`}</p>
                        : <p>{`${users.length} results`}</p>
                    }
                </div>

                {selectType === "project"
                    ? projects.map((item, index) => (
                        <ProjectCard project={item} key={index} projectPath={projectPath} starPath={starPath}
                                     unstarPath={unstarPath} submitSearchTag={this.submitSearchTag}
                                     authenticityToken={authenticityToken}/>
                    ))
                    : users.map((item, index) => (
                        <UserCard user={item} key={index} userPath={userPath} currentUser={currentUser}
                                  followPath={followPath}
                                  unfollowPath={unfollowPath} submitSearchTag={this.submitSearchTag}
                                  authenticityToken={authenticityToken}/>
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
    projectPath: PropTypes.string,
    userPath: PropTypes.string,
    followPath: PropTypes.string,
    unfollowPath: PropTypes.string,
    starPath: PropTypes.string,
    unstarPath: PropTypes.string,
    searchWord: PropTypes.string,
    selectType: PropTypes.string
}

export default Search
