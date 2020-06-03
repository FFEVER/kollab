# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Expertise.destroy_all
# puts 'Expertise destroyed'
# Project.destroy_all
# Faculty.destroy_all
# puts 'Faculty destroyed'
# User.destroy_all
# expertises = JSON.parse(File.read(Rails.root.join('app/assets/utils/expertises.json')))
# faculties = JSON.parse(File.read(Rails.root.join('app/assets/utils/faculties.json')))

# expertises.each do |expertise|
#   division = Expertise.create!(name: expertise['Division'])
#   expertise['Groups'].each do |group|
#     groups = Expertise.create!(name: group['Group'], parent: division)
#     group['Fields'].each do |field|
#       Expertise.create!(name: field, parent: groups)
#     end
#   end
# end

# faculties.each do |faculty|
#   Faculty.create!(name: faculty['faculty'])
# end


require 'faker'

def load_prof
  professors = JSON.parse(File.read(Rails.root.join('app/assets/utils/professors.json')))
  professors.each do |prof|
    name = prof['name'].split(' ')
    email = Faker::Internet.email
    password = '123456'
    first_name = name[0]
    last_name = name[1]
    description = Faker::Quote.matz
    role = 'professor'
    skills = prof['skills']
    fields = prof['fields']
    faculty = prof['faculty']

    if skills.blank?
      skills << Faker::Educator.subject
    elsif skills.nil?
      skills = [Faker::Educator.subject]
    else
      skills = skills.uniq[0...2]
    end


    u = User.new(email: email, password: password, password_confirmation: password)
    u.first_name = first_name
    u.last_name = last_name
    u.description = description
    u.role = role
    u.skill_list = skills
    fields.each do |name|
      es = Expertise.where('name LIKE ?', "%#{name.strip}%")
      u.expertises << es[0]
    end
    u.faculty = Faculty.find_by_name(faculty)
    # p u
    u.save
  end
end

def load_stud
  students = JSON.parse(File.read(Rails.root.join('app/assets/utils/students.json')))
  students.each do |stud|
    begin
      name = stud['name'].split(' ')
      email = Faker::Internet.email
      password = '123456'
      first_name = name[0]
      last_name = name[1]
      description = Faker::Quote.matz
      role = 'student'
      year = '4'
      skills = stud['skills']
      fields = stud['fields']
      faculty = stud['faculty']

      if skills.blank?
        skills << Faker::Educator.subject
      elsif skills.nil?
        skills = [Faker::Educator.subject]
      else
        skills = skills.uniq[0...2]
      end

      u = User.new(email: email, password: password, password_confirmation: password)
      u.first_name = first_name
      u.last_name = last_name
      u.description = description
      u.role = role
      u.year = year
      u.skill_list = skills
      fields.each do |name|
        es = Expertise.where('name LIKE ?', "%#{name.strip}%")
        u.expertises << es[0]
      end
      u.faculty = Faculty.find_by_name(faculty)
      # p u
      u.save(validate: false)
    rescue => e
      puts e.message
      p stud
    end
  end
end

def load_projects
  projects = JSON.parse(File.read(Rails.root.join('app/assets/utils/projects.json')))
  projects.each do |project|
    begin
      title = project['title']
      short_desc = project['short_desc']
      tags = project['tags']
      fields = project['fields']
      students = project['students']
      professor = project['professor']
      start_date = Faker::Date.between(from: 100.days.ago, to: Date.today)
      end_date = Faker::Date.between(from: Date.tomorrow, to: 100.days.from_now)

      proj = Project.new(title: title, short_desc: short_desc, start_date: start_date, end_date: end_date)
      proj.status = 'In progress'
      fields.each do |name|
        es = Expertise.where('name LIKE ?', "%#{name.strip}%")
        proj.expertises << es[0]
      end
      proj.tag_list = tags
      proj.save(validate: false)

      # Members
      students.each do |s|
        s_name = s.split(' ')
        s_first = s_name[0]
        s_last = s_name[1]
        students = User.where(first_name: s_first).where(last_name: s_last)
        proj.add_member students[0], is_owner: true unless students.blank?
      end

      if professor
        prof_name = professor.split(' ')
        prof_first = prof_name[0]
        prof_last = prof_name[1]
        profs = User.where(first_name: prof_first, last_name: prof_last)
        proj.add_member profs[0], is_owner: true unless profs.blank?
      end

    rescue => e
      puts e.message
      p project
    end

  end
end

User.destroy_all # Delete user BEFORE skills
Skill.destroy_all
load_stud
load_prof

Project.destroy_all
Tag.destroy_all
load_projects
