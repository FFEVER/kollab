# frozen_string_literal: true
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :short_desc, :status, :tags, :last_updated, :looking_roles, :starred, :star_count

  def starred
    false
  end

  def status
    self.object.project_status or 'In progress'
  end

  def last_updated
    time_ago_in_words(self.object.updated_at - 60 * 60 * 2) + ' ago'
  end

  def tags
    self.object.tags.map { |tag| tag.name }
  end

  def looking_roles
    ['Role1', 'Role2']
  end

  def star_count
    self.object.stars.count
  end
end
