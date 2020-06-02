import React from "react"

import profile from "../../../images/profile/profile_1.jpeg"
import PropTypes from "prop-types";

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
    render() {
        const {currentUser, showProjectTitle, posts} = this.props
        return (
            <div>
                {posts.map((item, index) => (
                    <div className="home__post">
                        {showProjectTitle ?
                            <div className="home__post__section">
                                <h4>{item.project.title}</h4>
                            </div>
                            : null
                        }
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
    showProjectTitle: PropTypes.bool,
}


export default PostCard
