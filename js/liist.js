Liist.START = () => {
  Liist.SET_PANEL()
  if (Liist.PANEL === "app") {
    document.getElementById("name").innerHTML = Spotify.USER.display_name.toLowerCase().trim()
    Liist.PLAYLIST_CONTAINER = document.getElementById("playlist-container")
    Liist.THEME_CONTAINER = document.getElementById("theme-container")
    Liist.IMAGE_CONTAINER = document.getElementById("image-container")
    Liist.APP()
    document.title += (" - Cover art editor")
    Liist.UNLOAD()
  }
  else if (Liist.PANEL === "home") {
    document.title += (" - Create spicy cover art for your spotify playlists")
    Liist.UNLOAD()
  }
}

Liist.UNLOAD = () => {
  $(document.body).removeClass("unloaded")
  $("#loader").fadeOut(1200, () => {
    $("#loader").remove()
  })
}

Liist.SET_PANEL = (panel) => {
  if (!panel) {
    panel = Liist.PANEL
  }
  Liist.PANEL = panel
  let t = ("panel-" + panel)
  let panels = document.getElementsByClassName("panel")
  for (let i = 0; i < panels.length; i++) {
    if (panels[i].id !== t) {
      panels[i].remove()
      i--;
    }
  }
}

Liist.FILL = (color) => {
  if (!color) {
    let color = "#19E68C"
  }
  let elements = document.getElementsByClassName("color")
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    let className = element.className
    if (element.className.constructor !== String) {
      className = element.className.baseVal
    }
    if (className.includes("color-color")) {
      element.style.color = color
    }
    else if (className.includes("color-background")) {
      element.style.background = color
    }
    else if (className.includes("color-fill")) {
      element.style.fill = color
    }
  }
}

Liist.APP = () => {
  //TODO
}
