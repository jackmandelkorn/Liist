Liist.START = () => {
  Liist.SET_PANEL()
  if (Liist.PANEL === "app") {
    document.getElementById("name").innerHTML = Spotify.USER.display_name.toLowerCase().trim()
  }
  Liist.UNLOAD()
  //TODO
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
