# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

User.create!(
  username: "aknishi",
  name: "Adrian Kawanishi",
  email: "adrian@example.com",
  password: '123456'
)

User.create!(
  username: "jordan9",
  name: "Jordan B.",
  email: "jordan@example.com",
  password: '123456'
)

User.create!(
  username: "wonderer",
  name: "Wonder World",
  email: "wonderer@example.com",
  password: '123456'
)
