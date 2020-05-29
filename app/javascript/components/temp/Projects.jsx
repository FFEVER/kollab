import React from "react"

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "project desction 1",
    tags: [
      { label: "tag1", name: "tag1" },
      { label: "tag2", name: "tag2" },
    ],
    status: "In progress",
    last_updated: "1 hour ago",
    lookingRoles: [
      "JavaScript Developer",
      "Accountant",
      "UX/UI Designer",
      "RoR Developer",
    ],
    starred: true,
  },
  {
    id: 2,
    title: "Project 2",
    description: "project desction 1",
    tags: [
      { label: "tag3", name: "tag3" },
      { label: "tag4", name: "tag4" },
    ],
    status: "Completed",
    last_updated: "2 days ago",
    lookingRoles: ["Python Developer", "RoR Developer"],
    starred: false,
  },
  //   {
  //     id: 3,
  //     title: "Project 3",
  //     description: "project desction 3",
  //     tags: [
  //       { label: "tag5", name: "tag5" },
  //       { label: "tag6", name: "tag6" },
  //     ],
  //     status: "On Hold",
  //     last_updated: "2 weeks ago",
  //     lookingRoles: ["Java Developer", "Business Analyse"],
  //     starred: true,
  //   },
  {
    id: 4,
    title: "Project 4",
    description: "project desction 3",
    tags: [
      { label: "tag7", name: "tag7" },
      { label: "tag8", name: "tag8" },
    ],
    status: "Initiating",
    last_updated: "1 month ago",
    lookingRoles: ["Python Developer", "Business Analyse"],
    starred: true,
  },
  //   {
  //     id: 5,
  //     title: "Project %",
  //     description: "project desction 3",
  //     tags: [
  //       { label: "tag9", name: "tag9" },
  //       { label: "tag10", name: "tag10" },
  //     ],
  //     status: "Cancelled",
  //     last_updated: "2 weeks ago",
  //     lookingRoles: ["Java Developer", "Business Analyse"],
  //     starred: false,
  //   },
]

class ProjectCard extends React.Component {
  converted(item) {
    return item.replace(" ", "").toLowerCase()
  }

  render() {
    return (
      <div>
        {projects.map((item, index) => (
          <div className="search__project__card" key={index}>
            <div className="search__project__detail">
              <div className="search__section">
                <h5 style={{ color: "#4e4e4e" }}>{item.title}</h5>
              </div>

              <div className="search__section">
                <p>{item.description}</p>
              </div>

              <div className="search__section">
                <div className="search__tags">
                  {item.tags.map((item, index) => (
                    <p className="link mr-1" key={index}>{`#${item.label}`}</p>
                  ))}
                </div>
              </div>

              <div className="search__section">
                <div className="search__project__row">
                  <div
                    className={`search__project__status search__project__status__${this.converted(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </div>
                  <i className="far fa-clock"></i>
                  <p className="ml-2">{item.last_updated}</p>
                </div>
              </div>

              <div className="search__section">
                <div className="search__project__row search__project__wrap ">
                  <i className="fas fa-user-friends"></i>

                  <p className="ml-2 mr-2">Looking for</p>
                  {item.lookingRoles.map((i, index) => (
                    <div className="button--tags mt-1" key={index}>
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {item.starred ? (
              <i className="fas fa-star"></i>
            ) : (
              <i className="far fa-star"></i>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default ProjectCard
