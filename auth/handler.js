"use strict"

const fetch = require("node-fetch")

let Spotify = {}
Spotify.CLIENT = "********************************"
Spotify.SECRET = "********************************"
Spotify.REDIRECT = null

module.exports.auth = (event, context, callback) => {
  let code = event.queryStringParameters.code
  Spotify.REDIRECT = event.queryStringParameters.redirect
  fetch(("https://accounts.spotify.com/api/token/?grant_type=authorization_code&client_id=" + Spotify.CLIENT + "&client_secret=" + Spotify.SECRET + "&redirect_uri=" + encodeURIComponent(Spotify.REDIRECT) + "&code=" + code), {
    method: "POST",
    headers: {
      "Authorization": "Basic " + (new Buffer(Spotify.CLIENT + ":" + Spotify.SECRET).toString("base64")),
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then((res) => {
    return res.json()
  }).then((data) => {
    const res = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    }
    callback(null,res)
  })
}
