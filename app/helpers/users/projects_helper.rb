# frozen_string_literal: true

module Users::ProjectsHelper
  def errors_to_camel(errors)
    new_errors = {}
    errors.each do |key, value|
      puts "#{key}, #{value}"
      new_errors[key.to_s.camelize(:lower)] = value
    end
    new_errors
  end

  def create_new_project_from_params(project_params)
    project = Project.new(
      title: project_params[:title],
      short_desc: project_params[:short_desc]
    )
    unless project_params[:start_date].blank?
      project.start_date = project_params[:start_date].to_date
    end
    unless project_params[:end_date].blank?
      project.end_date = project_params[:end_date].to_date
    end
    project.tag_list = project_params[:tag_list]

    project
  end
end
