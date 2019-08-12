let config = {}
config.mysql = {
  host: "localhost",
  username: "root",
  password: "parth",
  database: "project",
  tables: {
    users: "users",
    games: "games",
    tournaments: "tournaments",
    matches: "matches"
  }
}
module.exports = config
