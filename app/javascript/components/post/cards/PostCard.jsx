import React from "react"
import axios from "axios"

import profile from "../../../images/profile/profile_1.jpeg"
import PropTypes from "prop-types";
import {defaultErrors} from "../PostValidator";

const updateProjects = [
    {
        id: 1,
        user: {first_name: "Supichaya", last_name: "Boondol", profile_image_url: profile},
        action: "Update project status",
        statuses: {previous: "Initiating", currentStatus: "In progress"},
        // body: "Nearly finish!",
        project: {
            title: "Breathe with a better air",
            description: "Create an air refresher thath can control by mobile",
            tags: [
                {label: "Arduino", name: "tag1"},
                {label: "Cooking", name: "tag2"},
            ],
        },
        last_updated: "Wed 10 Dec 2019",
    }
]

class PostCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts
        }
    }

    handleDeletePost = (id) => {
        if (confirm("Do you want to delete a post?")) {
            this.deletePost(id)
        }
    }

    deletePost = (id) => {
        const formData = new FormData()
        formData.append("authenticity_token", this.props.authenticityToken)

        const url = this.props.deletePostPath.replace("id", id)
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
                    let {posts} = this.state
                    this.setState({
                        posts: posts.filter((post) => post.id !== id)
                    })
                }
            })
            .catch((error) => {
                alert(`Error: Code ${error.response.status}`)
            })
    }

    render() {
        const {currentUser, showProjectTitle} = this.props
        const {posts} = this.state
        return (
            <div>
                {posts.map((item, index) => (
                    <div className="home__post">
                        <div className="home__post__header">
                            {showProjectTitle ? <h4>{item.project.title}</h4> : null}
                            <div className="home__post__header__action">
                                {currentUser.id === item.user.id ?
                                    <a onClick={() => this.handleDeletePost(item.id)}>
                                        <i className="fas fa-times"></i>
                                    </a>
                                    : null
                                }
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
                                <div/>
                            )}
                        </div>

                        <div className="home__post__section home__post__action home__post__action__between">
                            <p>{item.last_updated}</p>
                            <div className="home__post__action">
                                <p className="mr-2">{`Updated by ${item.user.first_name}`}</p>
                                <img src={item.user.profile_image_url} className="home__post__img"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

PostCard.defaultProps = {
    showProjectTitle: true
}

PostCard.propTypes = {
    authenticityToken: PropTypes.string,
    currentUser: PropTypes.object,
    posts: PropTypes.array,
    deletePostPath: PropTypes.string,
    showProjectTitle: PropTypes.bool,
}


export default PostCard
