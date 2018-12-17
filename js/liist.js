Liist.START = () => {
  Liist.UNLOAD()
  //TODO
}

Liist.UNLOAD = () => {
  $(document.body).removeClass("unloaded")
  $("#loader").fadeOut(1200, () => {
    $("#loader").remove()
  })
}
