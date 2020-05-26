# frozen_string_literal: true

class Users::Settings::ProjectsController < ApplicationController
  def edit; end

  def update; end

  def project_params
    permitted = params.require(:project).permit(
      :title,
      :short_desc,
      :start_date,
      :end_date,
      :expertise_ids,
      :tag_list
    )
    if permitted[:expertise_ids]
      permitted[:expertise_ids] = JSON.parse(permitted[:expertise_ids]) || []
    end
    if permitted[:tag_list]
      permitted[:tag_list] = JSON.parse(permitted[:tag_list]) || []
    end
    permitted
  end
end
