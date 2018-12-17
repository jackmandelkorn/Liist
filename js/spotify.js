Spotify.CLIENT = "408b0907e22147409700122ae69ef4ee"
Spotify.REDIRECT = window.location.origin.toString()
Spotify.ACCESS_TOKEN = localStorage.getItem("spotify_access_token")
Spotify.SCOPES = [
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private"
]

Spotify.AUTH = () => {
  let scopes = Spotify.SCOPES.join(" ").trim()
  let redirect = Spotify.REDIRECT
  let url = ("https://accounts.spotify.com/authorize?response_type=code&client_id=" + Spotify.CLIENT + (scopes ? "&scope=" + encodeURIComponent(scopes) : "") + "&redirect_uri=" + encodeURIComponent(redirect))
  window.location.href = url
}

Spotify.CALLBACK = () => {
  let code = window.location.getParameter("code")
  $.ajax({
    url: "https://6yuao99tgl.execute-api.us-east-1.amazonaws.com/dev/token",
    data: {
      "code": code,
      "redirect": Spotify.REDIRECT
    },
    success: (res) => {
      Spotify.ACCESS_TOKEN = res.access_token
      localStorage.setItem("spotify_access_token",Spotify.ACCESS_TOKEN)
      window.location.href = window.location.origin
    }
  })
}

Spotify.AUTHORIZE = (xhr) => {
  xhr.setRequestHeader("Authorization", "Bearer " + Spotify.ACCESS_TOKEN)
}

Spotify.ERROR = (e) => {
  Spotify.ACCESS_TOKEN = null
  localStorage.setItem("spotify_access_token",Spotify.ACCESS_TOKEN)
  console.log(e)
  Spotify.AUTH()
}

Spotify.INIT = () => {
  if (!Spotify.ACCESS_TOKEN || Spotify.ACCESS_TOKEN === "null") {
    if (window.location.getParameter("code")) {
      Spotify.CALLBACK()
    }
    else {
      Spotify.AUTH()
    }
  }
  else {
    if (init) {
      (init)()
    }
  }
}
