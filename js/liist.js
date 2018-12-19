Liist.START = () => {
  Liist.SET_PANEL()
  if (Liist.PANEL === "app") {
    document.getElementById("name").innerHTML = Spotify.USER.display_name.toLowerCase().trim()
    Liist.PLAYLIST_CONTAINER = document.getElementById("playlist-container")
    Liist.THEME_CONTAINER = document.getElementById("theme-container")
    Liist.IMAGE_CONTAINER = document.getElementById("image-container")
    document.title += (" - Cover art editor")
    Liist.APP()
    Liist.FILL()
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
    color = Liist.THEMES[Liist.Config.THEME][0]
    if (color.constructor === Array) {
      color = color[0]
    }
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
  Liist.Config.PLAYLIST = 0
  Liist.Config.THEME = 2
  Liist.Config.IMAGE = 1
  Liist.Config.MAIN_COLOR = Liist.THEMES[Liist.Config.THEME][0]
  Liist.Config.ACCENT_COLOR = Liist.THEMES[Liist.Config.THEME][1]
  Liist.Config.TEXT_COLOR = "#FFFFFF"
  Liist.ADD_PLAYLISTS()
  Liist.ADD_THEMES()
  Liist.ADD_IMAGES()
  setTimeout(Liist.UPDATE,Liist.LAG)
}

Liist.ADD_PLAYLISTS = () => {
  Liist.PLAYLIST_CONTAINER.innerHTML = ""
  for (let i = 0; i < Liist.PLAYLISTS.length; i++) {
    let playlist = Liist.PLAYLISTS[i]
    let n = i
    let src = playlist.images[0].url
    let img = new Image()
    img.onload = () => {
      Liist.PLAYLIST_CONTAINER.appendChild(img)
    }
    img.onclick = () => {
      Liist.Config.PLAYLIST = n
      Liist.UPDATE()
    }
    img.id = ("playlist-" + n)
    img.style.order = n.toString()
    if (n === (Liist.PLAYLISTS.length - 1)) {
      img.style.marginBottom = "0px"
    }
    img.src = src
  }
}

Liist.ADD_THEMES = () => {
  for (let i = 0; i < Liist.THEMES.length; i++) {
    let theme = Liist.THEMES[i]
    let n = i
    let u = (24 / 640) * Liist.PREVIEW
    let margin = 2
    let bars = [[1,8],[3,6],[3,10],[2,4]]
    let mainColor = theme[0]
    let accentColor = theme[1]
    let canvas = document.createElement("canvas")
    canvas.width = Liist.PREVIEW
    canvas.height = Liist.PREVIEW
    let ctx = canvas.getContext("2d")
    let style
    if (mainColor.constructor === Array) {
      style = ctx.createLinearGradient(0, 0, 0, canvas.height)
      style.addColorStop(0, mainColor[0])
      style.addColorStop(1, mainColor[1])
    }
    else {
      style = mainColor
    }
    ctx.fillStyle = style
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    let image = Liist.IMAGES[Liist.Config.IMAGE].PREVIEW
    ctx.globalAlpha = 0.25
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
    ctx.fillStyle = accentColor
    ctx.fillRect(margin * u, margin * u, (bars[0][1]) * u, (bars[0][0]) * u)
    ctx.fillRect(margin * u, canvas.height - (margin * u), (bars[3][1]) * u, (((-1) * bars[3][0]) * u))
    ctx.fillStyle = Liist.Config.TEXT_COLOR
    ctx.fillRect(margin * u, Math.floor((canvas.height - u) / 2), (bars[1][1] * u), (((-1) * bars[1][0]) * u))
    ctx.fillRect(margin * u, Math.floor((canvas.height + u) / 2), (bars[2][1] * u), (bars[2][0] * u))
    let src = canvas.toDataURL()
    let img = document.getElementById("theme-" + n) || new Image()
    if (!document.getElementById("theme-" + n)) {
      img.onload = () => {
        Liist.THEME_CONTAINER.appendChild(img)
      }
    }
    img.onclick = () => {
      Liist.Config.THEME = n
      Liist.Config.MAIN_COLOR = mainColor
      Liist.Config.ACCENT_COLOR = accentColor
      Liist.UPDATE()
    }
    img.id = ("theme-" + n)
    img.style.order = n.toString()
    if (n === (Liist.THEMES.length - 1)) {
      img.style.marginBottom = "0px"
    }
    img.src = src
  }
}

Liist.ADD_IMAGES = () => {
  for (let i = 0; i < Liist.IMAGES.length; i++) {
    let image = Liist.IMAGES[i].PREVIEW
    let n = i
    let u = (24 / 640) * Liist.PREVIEW
    let margin = 2
    let bars = [[1,8],[3,6],[3,10],[2,4]]
    let mainColor = Liist.Config.MAIN_COLOR
    let accentColor = Liist.Config.ACCENT_COLOR
    let canvas = document.createElement("canvas")
    canvas.width = Liist.PREVIEW
    canvas.height = Liist.PREVIEW
    let ctx = canvas.getContext("2d")
    let style
    if (mainColor.constructor === Array) {
      style = ctx.createLinearGradient(0, 0, 0, canvas.height)
      style.addColorStop(0, mainColor[0])
      style.addColorStop(1, mainColor[1])
    }
    else {
      style = mainColor
    }
    ctx.fillStyle = style
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.fillStyle = accentColor
    ctx.fillRect(margin * u, margin * u, (bars[0][1]) * u, (bars[0][0]) * u)
    ctx.fillRect(margin * u, canvas.height - (margin * u), (bars[3][1]) * u, (((-1) * bars[3][0]) * u))
    ctx.fillStyle = Liist.Config.TEXT_COLOR
    ctx.fillRect(margin * u, Math.floor((canvas.height - u) / 2), (bars[1][1] * u), (((-1) * bars[1][0]) * u))
    ctx.fillRect(margin * u, Math.floor((canvas.height + u) / 2), (bars[2][1] * u), (bars[2][0] * u))
    let src = canvas.toDataURL()
    let img = document.getElementById("image-" + n) || new Image()
    if (!document.getElementById("image-" + n)) {
      img.onload = () => {
        Liist.IMAGE_CONTAINER.appendChild(img)
      }
    }
    img.onclick = () => {
      Liist.Config.IMAGE = n
      Liist.UPDATE()
    }
    img.id = ("image-" + n)
    img.style.order = n.toString()
    if (n === (Liist.IMAGES.length - 1)) {
      img.style.marginBottom = "0px"
    }
    img.src = src
  }
}

Liist.UPDATE = () => {
  Liist.PREVIEW = Math.floor(Liist.PLAYLIST_CONTAINER.offsetWidth * Math.sqrt(2))
  $(".selected").removeClass("selected")
  $("#playlist-" + Liist.Config.PLAYLIST.toString()).addClass("selected")
  $("#theme-" + Liist.Config.THEME.toString()).addClass("selected")
  $("#image-" + Liist.Config.IMAGE.toString()).addClass("selected")
  Liist.ADD_THEMES()
  Liist.ADD_IMAGES()
  Liist.FILL()
}
