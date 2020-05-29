import React from "react"

import anya from "../../images/anya.jpg"

const updateProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: anya },
    action: "Update project status",
    statuses: { previous: "Initiating", currentStatus: "In progress" },
    // message: "Nearly finish!",
    project: {
      title: "Update Project 1",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
    time: "Tue 9 Dec 2019",
  },
  {
    id: 2,
    user: { first_name: "Nattaphol", last_name: "Srisa", img: anya },
    action: "Post project status",
    message: "Get stuck on the machine part .__.",
    project: {
      title: "Update Project 2",
      description: "Project description",
      tags: [
        { label: "Tag1", name: "tag1" },
        { label: "Tag2", name: "tag2" },
      ],
    },
    time: "Wed 17 Dec 2019",
  },
]

class PostCard extends React.Component {
  render() {
    const { currentUser } = this.props
    return (
      <div>
        {updateProjects.map((item, index) => (
          <div className="home__post">
            <div className="home__post__section">
              <h4>{item.project.title}</h4>
            </div>
            <div className="home__post__message mt-2">
              {item.message ? (
                <p>{item.message}</p>
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
              <p>{item.time}</p>
              <div className="home__post__action">
                <p className="mr-2">{`${item.action} by ${item.user.first_name}`}</p>
                <img src={item.user.img} className="home__post__img" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default PostCard
