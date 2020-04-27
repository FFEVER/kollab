# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Expertise.destroy_all
puts 'Expertise destroyed'
expertises = JSON.parse(File.read(Rails.root.join('app/assets/utils/expertises.json')))
expertises.each do |expertise|
  division = Expertise.create!(name: expertise['Division'])
  expertise['Groups'].each do |group|
    groups = Expertise.create!(name: group['Group'], parent: division)
    group['Fields'].each do |field|
      Expertise.create!(name: field, parent: groups)
    end
  end
end
