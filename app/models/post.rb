class Post < ApplicationRecord
  belongs_to :user
  belongs_to :project

  validates :body, presence: true, length: {within: 1..300}
end
