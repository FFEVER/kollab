# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable
  has_many :members
  has_many :projects, through: :members
  has_many :followings, dependent: :delete_all, class_name: 'UserFollowing'
  has_many :followers, through: :user_followings
end
