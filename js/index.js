Spotify.USER = null
Spotify.PLAYLISTS = null

const init = () => {
  Spotify.Session.GET_USER(() => {
    Spotify.Session.GET_PLAYLISTS(() => {
      Liist.START()
    })
  })
}

Spotify.Session.GET_PLAYLISTS = (callback) => {
  $.ajax({
    url: "https://api.spotify.com/v1/me/playlists/?limit=50",
    method: "GET",
    beforeSend: Spotify.AUTHORIZE,
    success: (res) => {
      Spotify.PLAYLISTS = res;
      if (callback) {
        (callback)(res)
      }
    },
    error: (e) => {
      Spotify.ERROR(e)
    }
  })
}

Spotify.Session.GET_USER = (callback) => {
  $.ajax({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    beforeSend: Spotify.AUTHORIZE,
    success: (res) => {
      Spotify.USER = res;
      if (callback) {
        (callback)(res)
      }
    },
    error: (e) => {
      Spotify.ERROR(e)
    }
  })
}

Spotify.Session.SET_COVER = (id,image,callback) => {
  $.ajax({
    url: "https://api.spotify.com/v1/playlists/" + id + "/images",
    method: "PUT",
    beforeSend: Spotify.AUTHORIZE,
    processData: false,
    contentType: "application/octet-stream",
    data: window.blobify(image),
    success: (res) => {
      if (callback) {
        (callback)(res)
      }
    },
    error: (e) => {
      Spotify.ERROR(e)
    }
  })
}
