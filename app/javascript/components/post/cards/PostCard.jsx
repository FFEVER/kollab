import React from "react"

import profile from "../../../images/profile/profile_1.jpeg"

const updateProjects = [
  {
    id: 1,
    user: { first_name: "Supichaya", last_name: "Boondol", img: profile },
    action: "Update project status",
    statuses: { previous: "Initiating", currentStatus: "In progress" },
    // message: "Nearly finish!",
    project: {
      title: "Breathe with a better air",
      description: "Create an air refresher thath can control by mobile",
      tags: [
        { label: "Arduino", name: "tag1" },
        { label: "Cooking", name: "tag2" },
      ],
    },
    time: "Wed 10 Dec 2019",
  },
  {
    id: 2,
    user: { first_name: "Supichaya", last_name: "Boondol", img: profile },
    title: "Breathe with a better air",
    message: "Get stuck on the machine part .__.",
    project: {
      title: "Breathe with a better air",
      description: "Create an air refresher thath can control by mobile",
      tags: [
        { label: "RubyAndPython", name: "tag1" },
        { label: "ProgrammingLanguages", name: "tag2" },
      ],
    },
    time: "Tue 2 Dec 2019",
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
