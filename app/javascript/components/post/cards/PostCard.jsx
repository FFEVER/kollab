import React from "react"
import axios from "axios"
import PropTypes from "prop-types"

import portraitPlaceholder from "../../../images/portrait_placeholder.png"

class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts,
    }
  }

  handleDeletePost = (projectid, id) => {
    if (confirm("Do you want to delete a post?")) {
      this.deletePost(projectId, id)
    }
  }

  deletePost = (projectId, id) => {
    const formData = new FormData()
    formData.append("authenticity_token", this.props.authenticityToken)

    const url = this.props.deletePostPath
      .replace("id", id)
      .replace("project_id", projectId)
    axios({
      method: "delete",
      url: url,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          let { posts } = this.state
          this.setState({
            posts: posts.filter((post) => post.id !== id),
          })
        }
      })
      .catch((error) => {
        alert(`Error: Code ${error.response.status}`)
      })
  }

  getProjectPath = (id) => {
    return this.props.projectPath.replace("id", id)
  }

  getUserPath = (id) => {
    return this.props.userPath.replace("id", id)
  }

  render() {
    const { currentUser, showProjectTitle } = this.props
    const { posts } = this.state

    return (
      <div>
        {posts.map((item, index) => (
          <div className="home__post" key={item.id}>
            <div className="home__post__header">
              {showProjectTitle ? (
                <a href={this.getProjectPath(item.project.id)}>
                  <h4>{item.project.title}</h4>
                </a>
              ) : null}
              <div className="home__post__header__action">
                {currentUser.id === item.user.id ? (
                  <a
                    onClick={() =>
                      this.handleDeletePost(item.project.id, item.id)
                    }
                  >
                    <i className="fas fa-times"></i>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="home__post__message mt-2">
              {item.body ? (
                <p>{item.body}</p>
              ) : item.statuses ? (
                <div className="home__post__action">
                  <p>from </p>
                  <p className="font-weight-bold ml-1 mr-1">
                    {item.statuses.previous}
                  </p>
                  <p>to </p>
                  <p className="font-weight-bold ml-1">
                    {item.statuses.currentStatus}
                  </p>
                </div>
              ) : (
                <div />
              )}
            </div>

            <div className="home__post__section home__post__action home__post__action__between">
              <p>{item.last_updated}</p>
              <div className="home__post__action">
                <a href={this.getUserPath(item.user.id)}>
                  <p className="mr-2">{`Updated by ${item.user.first_name}`}</p>
                </a>
                <a href={this.getUserPath(item.user.id)}>
                  {item.user.profile_image_url === null ? (
                    <img
                      src={portraitPlaceholder}
                      className="home__post__img"
                    />
                  ) : (
                    <img
                      src={item.user.profile_image_url}
                      className="home__post__img"
                    />
                  )}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

PostCard.defaultProps = {
  showProjectTitle: true,
}

PostCard.propTypes = {
  authenticityToken: PropTypes.string,
  currentUser: PropTypes.object,
  posts: PropTypes.array,
  deletePostPath: PropTypes.string,
  projectPath: PropTypes.string,
  userPath: PropTypes.string,
  showProjectTitle: PropTypes.bool,
}

export default PostCard
