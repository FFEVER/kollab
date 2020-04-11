# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  MAX_IMG_MB_SIZE = 5
  VALID_IMG_TYPES = %w[image/png image/jpg image/jpeg].freeze

  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable

  has_many :members
  has_many :projects, through: :members do
    def owned
      where('members.is_owner = ?', true)
    end

    def participated
      where('members.is_owner = ?', false)
    end
  end

  has_many :favorites, dependent: :destroy
  has_many :starring_projects, through: :favorites, source: :project

  has_many :received_follows, as: :followable, class_name: 'Following', dependent: :delete_all
  has_many :followers, through: :received_follows, source: :follower
  has_many :given_follows, dependent: :delete_all,
                           foreign_key: :follower_id, class_name: 'Following'
  has_many :followings, through: :given_follows, source: :followable, source_type: 'User'
  has_many :following_projects, through: :given_follows, source: :followable, source_type: 'Project'
  has_one_attached :profile_image

  validates :first_name, presence: true, length: { within: 1..50 }
  validates :last_name, presence: true, length: { within: 1..50 }
  validates :profile_image, content_type: VALID_IMG_TYPES,
                            size: { less_than: MAX_IMG_MB_SIZE.megabytes,
                                    message: "should less than #{MAX_IMG_MB_SIZE} MB" }

  def following?(user)
    followings.include?(user)
  end

  def followed_by?(user)
    followers.include?(user)
  end

  def unfollow(user)
    followings.delete(user)
  end

  def followers=(user)
    followers << user
  end

  def followings=(user)
    followings << user
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def year_faculty
    '4th year Software Engineering Student'
  end

  def profile_image_url
    if profile_image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(profile_image, only_path: true)
    end
  end
end
