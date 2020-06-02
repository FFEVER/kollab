import React from "react"
import PropTypes from "prop-types"

class ProjectCard extends React.Component {
    converted(item) {
        return item.replace(" ", "").toLowerCase()
    }

    render() {
        const {
            title,
            short_desc,
            tags,
            status,
            last_updated,
            looking_roles,
            starred,
        } = this.props.project

        return (
            <div className="search__project__card">
                <div className="search__project__detail">
                    <div className="search__section">
                        <h5 style={{color: "#4e4e4e"}}>{title}</h5>
                    </div>

                    <div className="search__section">
                        <p>{short_desc}</p>
                    </div>

                    <div className="search__section">
                        <div className="search__tags">
                            {tags.map((item, index) => (
                                <p className="link mr-1" key={index}>{`#${item}`}</p>
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
                </div>
                {starred ? (
                    <i className="fas fa-star"></i>
                ) : (
                    <i className="far fa-star"></i>
                )}
            </div>
        )
    }
}

ProjectCard.propTypes = {
    project: PropTypes.object,
}
export default ProjectCard
