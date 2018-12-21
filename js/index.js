Spotify.USER = null
Spotify.PLAYLISTS = null

const init = () => {
  if (Liist.PANEL !== "home") {
    Spotify.Session.GET_USER(() => {
      Spotify.Session.GET_PLAYLISTS(() => {
        for (let i = 0; i < Liist.IMAGES.length; i++) {
          let imgFULL = new Image()
          let imgPREVIEW = new Image()
          imgFULL.src = (Liist.IMAGE_SOURCE + Liist.IMAGES[i])
          imgPREVIEW.src = (Liist.IMAGE_SOURCE + Liist.IMAGES[i])
          imgFULL.width = Liist.DIM
          imgFULL.height = Liist.DIM
          imgPREVIEW.width = Liist.PREVIEW
          imgPREVIEW.height = Liist.PREVIEW
          Liist.IMAGES[i] = {}
          Liist.IMAGES[i].FULL = imgFULL
          Liist.IMAGES[i].PREVIEW = imgPREVIEW
        }
        Liist.START()
      })
    })
  }
  else {
    Liist.START()
  }
}

Spotify.Session.GET_PLAYLISTS = (callback) => {
  $.ajax({
    url: "https://api.spotify.com/v1/me/playlists/?limit=50",
    method: "GET",
    beforeSend: Spotify.AUTHORIZE,
    success: (res) => {
      Spotify.PLAYLISTS = res
      Liist.PLAYLISTS = []
      for (let i = 0; i < Spotify.PLAYLISTS.items.length; i++) {
        if (Spotify.PLAYLISTS.items[i].owner.display_name === Spotify.USER.display_name) {
          Liist.PLAYLISTS.push(Spotify.PLAYLISTS.items[i])
        }
      }
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
    contentType: "image/jpeg",
    data: image.substring(23),
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
