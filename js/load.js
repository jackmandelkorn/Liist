if (window.mobilecheck()) {
  document.getElementById("mobile").style = ""
}
else {
  $(window).resize(Liist.UPDATE)
  Spotify.INIT()
}
