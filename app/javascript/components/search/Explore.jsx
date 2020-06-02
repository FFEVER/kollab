import React from "react"
import PropTypes from "prop-types"

import {TextField, IconButton, InputAdornment} from "@material-ui/core"

import ProjectCard from "./cards/ProjectCard"

class Explore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            searchText: "",
            selectType: "project",
        }

        this.handleChange = this.handleChange.bind(this)
        this.setIsButtonLoading = this.setIsButtonLoading.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
        this.keyPress = this.keyPress.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    setIsButtonLoading(isLoading) {
        this.setState({isButtonLoading: isLoading})
    }

    keyPress(e) {
        if (e.keyCode === 13) {
            this.submitSearch()
        }
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
        const {projects, starPath, unstarPath, projectPath, showSearchBar, authenticityToken} = this.props

        return (
            <div className="d-flex flex-column">
                {showSearchBar ?
                    <TextField
                        id="search"
                        className="search__bar"
                        placeholder={`Search anything...`}
                        type="search"
                        variant="outlined"
                        onChange={this.handleChange}
                        onKeyDown={this.keyPress}
                        name="searchText"
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
                    : null}

                {projects.map((item, index) => (
                    <ProjectCard project={item} key={index} projectPath={projectPath} starPath={starPath}
                                 unstarPath={unstarPath} submitSearchTag={this.submitSearchTag} authenticityToken={authenticityToken}/>
                ))}
            </div>
        )
    }
}

Explore.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    projects: PropTypes.array,
    searchPath: PropTypes.string,
    projectPath: PropTypes.string,
    starPath: PropTypes.string,
    unstarPath: PropTypes.string,
    showSearchBar: PropTypes.bool
}

export default Explore
