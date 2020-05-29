import React from "react"

const projects = [
  {
    id: 1,
    title: "Pet feeder",
    description: "A pet feeder machine controlled by a mobile application",
    tags: [
      { label: "Machine", name: "tag1" },
      { label: "MobileApp", name: "tag2" },
    ],
    status: "In progress",
    last_updated: "1 hour ago",
    lookingRoles: [
      "JavaScript Developer",
      "UX/UI Designer",
      "Ruby on Rails Developer",
    ],
    starred: true,
  },
  {
    id: 2,
    title: "Garden carer",
    description: "A machine that take care my garden when I'm away",
    tags: [
      { label: "WebApp", name: "tag1" },
      { label: "Engineering", name: "tag2" },
    ],
    status: "Completed",
    last_updated: "2 days ago",
    lookingRoles: ["Machine Developer", "Web Developer"],
    starred: false,
  },
  {
    id: 3,
    title: "Music for fun",
    description: "Create a funny music tone by using pet sounds",
    tags: [
      { label: "Music", name: "tag5" },
      { label: "Veterinarian", name: "tag6" },
    ],
    status: "On Hold",
    last_updated: "2 weeks ago",
    lookingRoles: ["Musician", "Business Analyse"],
    starred: true,
  },
  {
    id: 4,
    title: "Dating App",
    description: "App similar to Tinder",
    tags: [
      { label: "MobileApp", name: "tag7" },
      { label: "Matching", name: "tag8" },
    ],
    status: "Initiating",
    last_updated: "1 month ago",
    lookingRoles: ["Python Developer", "Business Analyse"],
    starred: true,
  },
  {
    id: 5,
    title: "Business for homeless",
    description: "project desction 3",
    tags: [
      { label: "Business", name: "tag9" },
      { label: "Freedom", name: "tag10" },
    ],
    status: "Cancelled",
    last_updated: "2 weeks ago",
    lookingRoles: ["Business analyse", "Accountant"],
    starred: false,
  },
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
