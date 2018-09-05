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

p1 = Post.new(
  body: "Light up the night",
  location: "",
  user_id: user1.id
)

p1.photo.attach(io: open(
  "https://pixtagram-dev.s3.amazonaws.com/iDcrYA8NLSgLU7jWcm14E4ok"),
  filename: "fire-glow.jpg"
)

p1.save

p2 = Post.new(
  body: "ABGT250",
  location: "Gorge Ampitheatre",
  user_id: user2.id
)

p2.photo.attach(io: open(
  "https://pixtagram-dev.s3.amazonaws.com/f472ULfLMbavk7Fq3JAWLnk8"),
  filename: "gorge_amphitheatre.jpg"
)

p2.save

p3 = Post.new(
  body: "Exploring the glaciers of South America",
  location: "El Chalten",
  user_id: user3.id
)

p3.photo.attach(io: open(
  "https://pixtagram-dev.s3.amazonaws.com/fVNtTvEXZGUzxFkvTEXYcmwb"),
  filename: "glacier.jpg"
)

p3.save

p4 = Post.new(
  body: "Get Lost in a Desert",
  location: "Abu Dhabi",
  user_id: user3.id
)

p4.photo.attach(io: open(
  "https://pixtagram-dev.s3.amazonaws.com/Lbi3B3rJD4bNadTHbRWK2Mn5"),
  filename: "desert.jpg"
)
