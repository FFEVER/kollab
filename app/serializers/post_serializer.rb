require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :last_updated
  belongs_to :user
  belongs_to :project

  def last_updated
    time_ago_in_words(self.object.updated_at - 60 * 60 * 2) + ' ago'
  end
end
