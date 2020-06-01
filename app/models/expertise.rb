# frozen_string_literal: true

class Expertise < ApplicationRecord
  has_many :subexpertises, class_name: 'Expertise', foreign_key: 'parent_id', dependent: :destroy
  belongs_to :parent, class_name: 'Expertise', optional: true

  def self.get_expertises
    Expertise.all
  end

  def self.divisions
    Expertise.where(parent: nil)
  end

  def self.groups(division)
    division.subexpertises
  end

  def self.fields(group)
    group.subexpertises
  end

  def parents_tree
    parents_tree_helper(self, [self])
  end

  private

  def parents_tree_helper(expertise, tree)
    return tree if expertise.parent.nil?

    tree.unshift(expertise.parent)
    parents_tree_helper(expertise.parent, tree)
  end
end
