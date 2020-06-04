import React from "react"
import PropTypes from "prop-types"
import axios from "axios"

class ProjectCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starred: false,
      starCount: 0,
    }
  }

  componentDidMount() {
    this.setState({
      starred: this.props.project.starred,
      starCount: this.props.project.star_count,
    })
  }

  converted(item) {
    return item.replace(" ", "").toLowerCase()
  }

  getProjectPath = (projectPath, projectId) => {
    return projectPath.replace("id", projectId)
  }

  submitSearchTag = (tagName, parentType) => {
    const searchPath = this.props.searchPath
    window.location.href = `${searchPath}?word=${tagName}&type=${parentType}`
  }

  handleStar = () => {
    let submitPath = this.props.starPath
    if (this.state.starred) {
      submitPath = this.props.unstarPath
    }
    submitPath = submitPath.replace("id", this.props.project.id)
    const formData = new FormData()
    formData.append("authenticity_token", this.props.authenticityToken)

    axios({
      method: "post",
      url: submitPath,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
      data: formData,
    }).then((response) => {
      this.setState({
        starred: response.data.starred,
        starCount: response.data.count,
      })
    })
  }

  render() {
    const {
      id,
      title,
      short_desc,
      tags,
      status,
      last_updated,
      looking_roles,
    } = this.props.project

    const { projectPath } = this.props

    const { starred, starCount } = this.state
    console.log("this ", this.props, this.props.project.looking_roles.length)
    return (
      <div className="search__project__card">
        <div className="search__project__detail">
          <div className="search__section">
            <a href={this.getProjectPath(projectPath, id)}>
              <h5 style={{ color: "#4e4e4e" }}>{title}</h5>
            </a>
          </div>

          <div className="search__section">
            <a href={this.getProjectPath(projectPath, id)}>
              <p>{short_desc}</p>
            </a>
          </div>

          <div className="search__section">
            <div className="search__tags">
              {tags.map((item, index) => (
                <a
                  href="#"
                  className="link mr-1"
                  onClick={() => this.submitSearchTag(item, "project")}
                  key={index}
                >{`#${item}`}</a>
              ))}
            </div>
          </div>

          <div className="search__section">
            <div className="search__project__row">
              <div
                className={`search__project__status search__project__status__${this.converted(
                  status
                )}`}
              >
                {status}
              </div>
              <i className="far fa-clock"></i>
              <p className="ml-2">{last_updated}</p>
            </div>
          </div>
          {looking_roles.length > 0 ? (
            <div className="search__section">
              <div className="search__project__row search__project__wrap ">
                <i className="fas fa-user-friends"></i>

                <p className="ml-2 mr-2">Looking for</p>
                {looking_roles.map((item, index) => (
                  <div className="button--tags mt-1" key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className="search__project__actions">
          <a onClick={this.handleStar} className="action--star">
            {starred ? (
              <i className="fas fa-star"></i>
            ) : (
              <i className="far fa-star"></i>
            )}
            {starCount}
          </a>
        </div>
      </div>
    )
  }
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  starPath: PropTypes.string,
  unstarPath: PropTypes.string,
  projectPath: PropTypes.string,
  authenticityToken: PropTypes.string,
  searchPath: PropTypes.string,
  submitSearchTag: PropTypes.func,
}
export default ProjectCard
