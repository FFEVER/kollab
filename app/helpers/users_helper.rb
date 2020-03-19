# frozen_string_literal: true

module UsersHelper
  def profile_info_page?
    params[:page] != 'project'
  end

  def project_page
    'project'
  end
end
