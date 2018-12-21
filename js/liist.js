Liist.START = () => {
  Liist.SET_PANEL()
  if (Liist.PANEL === "app") {
    Liist.CANVAS = document.createElement("canvas")
    Liist.CANVAS.width = Liist.DIM
    Liist.CANVAS.height = Liist.DIM
    Liist.CTX = Liist.CANVAS.getContext("2d")
    document.getElementById("name").innerHTML = Spotify.USER.display_name.toLowerCase().trim()
    Liist.PLAYLIST_CONTAINER = document.getElementById("playlist-container")
    Liist.THEME_CONTAINER = document.getElementById("theme-container")
    Liist.IMAGE_CONTAINER = document.getElementById("image-container")
    Liist.MAIN_TEXT_CONTAINER = document.getElementById("main-text")
    Liist.ACCENT_TEXT_CONTAINER = document.getElementById("accent-text")
    Liist.MAIN = document.getElementById("main")
    Liist.MAIN_COLOR_INPUT = document.getElementById("main-color-input")
    Liist.ACCENT_COLOR_INPUT = document.getElementById("accent-color-input")
    Liist.TEXT_COLOR_INPUT = document.getElementById("text-color-input")
    Liist.MAIN_SIZE_INPUT = document.getElementById("main-text-size-input")
    Liist.ACCENT_SIZE_INPUT = document.getElementById("accent-text-size-input")
    Liist.PADDING_INPUT = document.getElementById("padding-input")
    Liist.FADE_INPUT = document.getElementById("fade-input")
    Liist.VERTICAL_INPUT = document.getElementById("vertical-input")
    Liist.ROUNDED_BUMP_INPUT = document.getElementById("rounded-bump-input")
    Liist.BUMP_INPUT = document.getElementById("bump-input")
    Liist.GRADIENT_FADE_INPUT = document.getElementById("gradient-fade-input")
    Liist.EXPORT = null
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

Liist.APP = (t) => {
  //DEFAULTS
  Liist.Config.PLAYLIST = 0
  Liist.Config.THEME = 2
  Liist.Config.IMAGE = 1
  Liist.Config.MAIN_COLOR = Liist.THEMES[Liist.Config.THEME][0]
  Liist.Config.ACCENT_COLOR = Liist.THEMES[Liist.Config.THEME][1]
  Liist.Config.TEXT_COLOR = "#FFFFFF"
  Liist.Config.MAIN_TEXT = Liist.PLAYLISTS[Liist.Config.PLAYLIST].name.toLowerCase().trim()
  Liist.Config.ACCENT_TEXT = (Spotify.USER.display_name.toLowerCase().trim() + "'s")
  Liist.Config.TEXT_ALIGN = "center"
  Liist.Config.MAIN_SIZE = 120
  Liist.Config.ACCENT_SIZE = 36
  Liist.Config.PADDING = 100
  Liist.Config.VERTICAL = 0
  Liist.Config.BUMP = true
  Liist.Config.ROUNDED_BUMP = true
  Liist.Config.FADE = 0.5
  Liist.Config.GRADIENT_FADE = true
  if (!t) {
    Liist.ADD_PLAYLISTS()
    Liist.LOAD_PLAYLIST()
    Liist.ADD_THEMES()
    Liist.ADD_IMAGES()
    Liist.MAIN_TEXT_CONTAINER.value = Liist.Config.MAIN_TEXT
    Liist.ACCENT_TEXT_CONTAINER.value = Liist.Config.ACCENT_TEXT
    Liist.INPUT(Liist.MAIN_TEXT_CONTAINER,"MAIN_TEXT")
    Liist.INPUT(Liist.ACCENT_TEXT_CONTAINER,"ACCENT_TEXT")
    Liist.INPUT(Liist.MAIN_COLOR_INPUT,"MAIN_COLOR")
    Liist.INPUT(Liist.ACCENT_COLOR_INPUT,"ACCENT_COLOR")
    Liist.INPUT(Liist.TEXT_COLOR_INPUT,"TEXT_COLOR")
    Liist.INPUT(Liist.MAIN_SIZE_INPUT,"MAIN_SIZE")
    Liist.INPUT(Liist.ACCENT_SIZE_INPUT,"ACCENT_SIZE")
    Liist.INPUT(Liist.PADDING_INPUT,"PADDING")
    Liist.INPUT(Liist.FADE_INPUT,"FADE")
    Liist.INPUT(Liist.VERTICAL_INPUT,"VERTICAL")
    Liist.CHECKBOX(Liist.ROUNDED_BUMP_INPUT,"ROUNDED_BUMP")
    Liist.CHECKBOX(Liist.BUMP_INPUT,"BUMP")
    Liist.CHECKBOX(Liist.GRADIENT_FADE_INPUT,"GRADIENT_FADE")
    setTimeout(Liist.UPDATE,Liist.LAG)
  }
  else {
    Liist.UPDATE()
  }
}

Liist.INPUT = (container,param) => {
  Liist.INPUT_ARR.push([container,param])
  $(container).on("keyup change paste input", () => {
    let val = container.value
    if (!isNaN(val)) {
      val = parseFloat(val)
    }
    Liist.Config[param] = val
    Liist.RENDER()
  })
}

Liist.CHECKBOX = (container,param) => {
  Liist.CHECKBOX_ARR.push([container,param])
  $(container).on("click",() => {
    let val = Liist.Config[param]
    if (val) {
      val = false
      container.className = ""
    }
    else {
      val = true
      container.className = "checked"
    }
    Liist.Config[param] = val
    Liist.RENDER()
  })
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
      Liist.Config.MAIN_TEXT = Liist.PLAYLISTS[Liist.Config.PLAYLIST].name.toLowerCase().trim()
      Liist.LOAD_PLAYLIST(() => {
        Liist.UPDATE()
      })
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

Liist.RENDER = () => {
  let style
  if (Liist.Config.MAIN_COLOR.constructor === Array) {
    style = Liist.CTX.createLinearGradient(0, 0, 0, Liist.DIM)
    style.addColorStop(0, Liist.Config.MAIN_COLOR[0])
    style.addColorStop(1, Liist.Config.MAIN_COLOR[1])
  }
  else {
    style = Liist.Config.MAIN_COLOR
  }
  Liist.CTX.fillStyle = style
  Liist.CTX.fillRect(0, 0, Liist.DIM, Liist.DIM)
  Liist.CTX.drawImage(Liist.IMAGES[Liist.Config.IMAGE].FULL, 0, 0, Liist.DIM, Liist.DIM)
  if (Liist.Config.GRADIENT_FADE) {
    style = Liist.CTX.createLinearGradient(0, 0, 0, Liist.DIM)
    style.addColorStop(0, "transparent")
    let gradientColor = Liist.Config.MAIN_COLOR
    if (Liist.Config.MAIN_COLOR.constructor === Array) {
      gradientColor = Liist.Config.MAIN_COLOR[1]
    }
    style.addColorStop(1, gradientColor)
  }
  else {
    style = Liist.Config.MAIN_COLOR
    if (Liist.Config.MAIN_COLOR.constructor === Array) {
      style = Liist.CTX.createLinearGradient(0, 0, 0, Liist.DIM)
      style.addColorStop(0, Liist.Config.MAIN_COLOR[0])
      style.addColorStop(1, Liist.Config.MAIN_COLOR[1])
    }
  }
  Liist.CTX.globalAlpha = Liist.Config.FADE
  Liist.CTX.fillStyle = style
  Liist.CTX.fillRect(0, 0, Liist.DIM, Liist.DIM)
  Liist.CTX.globalAlpha = 1
  if (Liist.Config.BUMP) {
    Liist.CTX.strokeStyle = Liist.Config.ACCENT_COLOR
    let width = Liist.Config.ACCENT_SIZE * Math.PI
    let height = Liist.Config.ACCENT_SIZE
    let x
    let y = ((Liist.DIM - Liist.Config.PADDING) - (height / 2))
    if (Liist.Config.TEXT_ALIGN === "left") {
      x = Liist.Config.PADDING + (height / 2)
    }
    else if (Liist.Config.TEXT_ALIGN === "center") {
      x = ((Liist.DIM - (width - (height / 2))) / 2)
    }
    else if (Liist.Config.TEXT_ALIGN === "right") {
      x = ((Liist.DIM - Liist.Config.PADDING) - (width - (height / 2)))
    }
    Liist.CTX.lineWidth = height
    Liist.CTX.beginPath()
    Liist.CTX.lineCap = "square"
    if (Liist.Config.ROUNDED_BUMP) {
      Liist.CTX.lineCap = "round"
    }
    Liist.CTX.moveTo(x, y)
    Liist.CTX.lineTo((x + (width - height)), y)
    Liist.CTX.stroke()
  }
  Liist.PUT_ACCENT_TEXT()
  Liist.PUT_MAIN_TEXT()
  Liist.EXPORT = Liist.CANVAS.toDataURL()
  Liist.MAIN.style.backgroundImage = ("url(" + Liist.EXPORT + ")")
}

Liist.PUT_MAIN_TEXT = () => {
  let scale = (Liist.MAIN.offsetWidth / Liist.DIM)
  Liist.CTX.font = "bold " + Liist.Config.MAIN_SIZE.toString() + "px Proxima Nova"
  let lines = (Liist.DIVIDE_TEXT(Liist.Config.MAIN_TEXT) || [])
  Liist.MAIN_TEXT_CONTAINER.style.width = ((scale * (Liist.DIM - (Liist.Config.PADDING * 2))).toString() + "px")
  let height = (((lines.length) || 1) * Liist.Config.MAIN_SIZE)
  Liist.MAIN_TEXT_CONTAINER.style.height = ((height * scale).toString() + "px")
  Liist.MAIN_TEXT_CONTAINER.style.fontSize = ((Liist.Config.MAIN_SIZE * scale) + "px")
  Liist.MAIN_TEXT_CONTAINER.style.textAlign = Liist.Config.TEXT_ALIGN
  Liist.MAIN_TEXT_CONTAINER.style.caretColor = Liist.Config.TEXT_COLOR
  Liist.MAIN_TEXT_CONTAINER.style.left = ((Liist.Config.PADDING * scale).toString() + "px")
  let top = ((((Liist.DIM / 2) - ((height + Liist.Config.MAIN_SIZE) / 2)) + (Liist.Config.MAIN_SIZE / 2)) - Liist.Config.VERTICAL)
  Liist.MAIN_TEXT_CONTAINER.style.top = ((top * scale).toString() + "px")
  let x
  if (Liist.Config.TEXT_ALIGN === "left") {
    x = Liist.Config.PADDING
  }
  else if (Liist.Config.TEXT_ALIGN === "center") {
    x = (Liist.DIM / 2)
  }
  else if (Liist.Config.TEXT_ALIGN === "right") {
    x = (Liist.DIM - Liist.Config.PADDING)
  }
  Liist.CTX.fillStyle = Liist.Config.TEXT_COLOR
  Liist.CTX.textAlign = Liist.Config.TEXT_ALIGN
  for (let i = 0; i < lines.length; i++) {
    Liist.CTX.fillText(lines[i], x, (((top + Liist.Config.MAIN_SIZE) - (Liist.Config.MAIN_SIZE / (Math.PI * 2))) + (i * Liist.Config.MAIN_SIZE)))
  }
}

Liist.PUT_ACCENT_TEXT = () => {
  let scale = (Liist.MAIN.offsetWidth / Liist.DIM)
  Liist.CTX.font = "bold " + Liist.Config.ACCENT_SIZE.toString() + "px Proxima Nova"
  let lines = (Liist.DIVIDE_TEXT(Liist.Config.ACCENT_TEXT) || [])
  Liist.ACCENT_TEXT_CONTAINER.style.width = ((scale * (Liist.DIM - (Liist.Config.PADDING * 2))).toString() + "px")
  let height = (((lines.length) || 1) * Liist.Config.ACCENT_SIZE)
  Liist.ACCENT_TEXT_CONTAINER.style.height = ((height * scale).toString() + "px")
  Liist.ACCENT_TEXT_CONTAINER.style.fontSize = ((Liist.Config.ACCENT_SIZE * scale) + "px")
  Liist.ACCENT_TEXT_CONTAINER.style.textAlign = Liist.Config.TEXT_ALIGN
  Liist.ACCENT_TEXT_CONTAINER.style.caretColor = Liist.Config.ACCENT_COLOR
  Liist.ACCENT_TEXT_CONTAINER.style.left = ((Liist.Config.PADDING * scale).toString() + "px")
  let top = Liist.Config.PADDING
  Liist.ACCENT_TEXT_CONTAINER.style.top = ((top * scale).toString() + "px")
  let x
  if (Liist.Config.TEXT_ALIGN === "left") {
    x = Liist.Config.PADDING
  }
  else if (Liist.Config.TEXT_ALIGN === "center") {
    x = (Liist.DIM / 2)
  }
  else if (Liist.Config.TEXT_ALIGN === "right") {
    x = (Liist.DIM - Liist.Config.PADDING)
  }
  Liist.CTX.fillStyle = Liist.Config.ACCENT_COLOR
  Liist.CTX.textAlign = Liist.Config.TEXT_ALIGN
  for (let i = 0; i < lines.length; i++) {
    Liist.CTX.fillText(lines[i], x, (((top + Liist.Config.ACCENT_SIZE) - (Liist.Config.ACCENT_SIZE / (Math.PI * 2))) + (i * Liist.Config.ACCENT_SIZE)))
  }
}

Liist.DIVIDE_TEXT = (text) => {
  let lines = text.split("\n")
  let ret = []
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let peg = false
    if (line === "") {
      line = "A"
      peg = true
    }
    let arr = Liist.BREAK_TEXT(line)
    if (peg) {
      ret.push("")
    }
    else {
      for (let a = 0; a < arr.length; a++) {
        ret.push(arr[a])
      }
    }
  }
  return ret
}

Liist.BREAK_TEXT = (text) => {
  let lines = []
  let words = text.split(" ")
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    if (word === "") {
      words.splice(i, 1)
      try {
        words[i - 1] = (words[i - 1].toString() + (" "))
      } catch (e) {}
      i--
    }
    else if (!((Math.round(Liist.CTX.measureText(word).width)) < Math.round(Liist.DIM - (Liist.Config.PADDING * 2)))) {
      let temp = ""
      let c = 0
      while (((Math.round(Liist.CTX.measureText(temp).width)) < Math.round(Liist.DIM - (Liist.Config.PADDING * 2))) && (c < word.length)) {
        temp += word[c]
        c++
      }
      temp = temp.substring(temp, temp.length - 1)
      let add = word.substring(c - 1)
      word = temp
      words[i] = word
      words.splice(i + 1, 0, add)
    }
  }
  while (words.length > 0) {
    let line = []
    while (((Math.round(Liist.CTX.measureText(line.join(" ").trim()).width)) < Math.round(Liist.DIM - (Liist.Config.PADDING * 2))) && (words.length > 0)) {
      line.push(words.shift())
    }
    if (!(((Math.round(Liist.CTX.measureText(line.join(" ").trim()).width)) < Math.round(Liist.DIM - (Liist.Config.PADDING * 2))))) {
      words.unshift(line.pop())
    }
    line = line.join(" ")
    lines.push(line)
  }
  return lines
}

Liist.UPDATE = () => {
  Liist.PREVIEW = Math.floor(Liist.PLAYLIST_CONTAINER.offsetWidth * Math.sqrt(2))
  $(".selected").removeClass("selected")
  $("#playlist-" + Liist.Config.PLAYLIST.toString()).addClass("selected")
  $("#theme-" + Liist.Config.THEME.toString()).addClass("selected")
  $("#image-" + Liist.Config.IMAGE.toString()).addClass("selected")
  $("#align-" + Liist.Config.TEXT_ALIGN.toString()).addClass("selected")
  Liist.ADD_THEMES()
  Liist.ADD_IMAGES()
  Liist.FILL()
  Liist.UPDATE_INPUTS()
  Liist.RENDER()
}

Liist.UPDATE_INPUTS = () => {
  for (let i = 0; i < Liist.INPUT_ARR.length; i++) {
    let container = Liist.INPUT_ARR[i][0]
    let param = Liist.INPUT_ARR[i][1]
    container.value = Liist.Config[param]
  }
  for (let i = 0; i < Liist.CHECKBOX_ARR.length; i++) {
    let container = Liist.CHECKBOX_ARR[i][0]
    let param = Liist.CHECKBOX_ARR[i][1]
    let val = Liist.Config[param]
    if (val) {
      container.className = "checked"
    }
    else {
      container.className = ""
    }
  }
}

Liist.SAVE_CLICK = () => {
  let id = Liist.PLAYLISTS[Liist.Config.PLAYLIST].id
  Spotify.Session.SET_COVER(id,Liist.CANVAS.toDataURL("image/jpeg"),() => {
    Liist.UPDATE_PLAYLIST(() => {
      document.getElementById("playlist-" + Liist.Config.PLAYLIST.toString()).src = Liist.EXPORT
    })
  })
}

Liist.RESET_CLICK = () => {
  Liist.APP(true)
}

Liist.ALIGN_CLICK = (val) => {
  Liist.Config.TEXT_ALIGN = val.toLowerCase().trim()
  Liist.UPDATE()
}

Liist.LOAD_PLAYLIST = (callback) => {
  let params = {
    TableName: "Liist",
    Key: {
      "playlist": Liist.PLAYLISTS[Liist.Config.PLAYLIST].id.toString(),
      "spotifyuser": Spotify.USER.id.toString()
    }
  }
  docClient.get(params, function(err, data) {
    if (err) {
      console.log(err)
    }
    else {
      if (data.Item) {
        let p = Liist.Config.PLAYLIST
        Liist.Config = JSON.parse(data.Item.config)
        Liist.Config.PLAYLIST = p
      }
      if (callback) {
        (callback)()
      }
    }
  })
}

Liist.UPDATE_PLAYLIST = (callback) => {
  var params = {
    TableName: "Liist",
    Key: {
      "playlist": Liist.PLAYLISTS[Liist.Config.PLAYLIST].id.toString(),
      "spotifyuser": Spotify.USER.id.toString()
    },
		UpdateExpression: "set config = :config",
		ExpressionAttributeValues: {
			":config": JSON.stringify(Liist.Config)
		}
	}
  docClient.update(params, function(err, data) {
		if (err) {
			console.log(err)
		}
    else {
      if (callback) {
        (callback)()
      }
    }
	})
}
