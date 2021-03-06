# frozen_string_literal: true
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class ProjectSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :title, :short_desc, :status, :tags, :last_updated, :looking_roles, :starred, :star_count

  attribute :links do
    id = object.id
    {
        'show': project_path(id)
    }
  end

  def starred
    false
  end

  def status
    object.status or 'In progress'
  end

  def last_updated
    time_ago_in_words(self.object.updated_at - 60 * 60 * 2) + ' ago'
  end

  def tags
    self.object.tags.map { |tag| tag.name }
  end

  def looking_roles
    object.roles.open.map { |role| role.title }
  end

  def star_count
    self.object.stars.count
  end
end
