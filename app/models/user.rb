# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable
  has_many :members
  has_many :projects, through: :members do
    def owner
      where('members.is_owner = ?', true)
    end

    def participant
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
end
