# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Post.delete_all

User.create!(
  username: "guest",
  name: "Guest",
  email: "guest@example.com",
  password: '123456'
)

User.create!(
  username: "aknishi",
  name: "Adrian Kawanishi",
  email: "adrian@example.com",
  password: '123456'
)

User.create!(
  username: "jordan8",
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

guest = User.find_by(username: "guest")
user1 = User.find_by(username: "aknishi")
user2 = User.find_by(username: "jordan8")
user3 = User.find_by(username: "wonderer")

p1 = Post.create!(
  body: "Nice day at the beach",
  location: "Mission Beach",
  user_id: user1.id
)

# p1.photo.attach(io: File.open(
#   "/Users/adriankawanishi/Documents/AppAcademy/pixtagram_photos/mission_beach.jpg"),
#   filename: "mission_beach.jpg"
# )

p2 = Post.create!(
  body: "",
  location: "Gorge Ampitheatre",
  user_id: user2.id
)

# p2.photo.attach(io: File.open(
#   "/Users/adriankawanishi/Documents/AppAcademy/pixtagram_photos/gorge_amphitheatre.png"),
#   filename: "gorge_amphitheatre.jpg"
# )

p3 = Post.create!(
  body: "Exploring the glaciers",
  location: "",
  user_id: user3.id
)

# p3.photo.attach(io: File.open(
#   "/Users/adriankawanishi/Documents/AppAcademy/pixtagram_photos/glacier.png"),
#   filename: "glacier.jpg"
# )
