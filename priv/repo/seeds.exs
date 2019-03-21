# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasks3.Repo.insert!(%Tasks3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
#
Tasks3.Repo.insert!(%Tasks3.Tasks.Task{title: "get dinner", description: "eat some fuds", doer_id: nil})


pwhash = Argon2.hash_pwd_salt("password")
Tasks3.Repo.insert!(%Tasks3.Users.User{name: "Alice", password_hash: pwhash})
