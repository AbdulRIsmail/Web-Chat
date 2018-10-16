home = () => {

  var home = document.getElementById('home')
  var draw = document.getElementById('draw')
  draw.style.display = 'block'
  home.style.display = 'none'
}

draw = () => {
  var draw = document.getElementById('draw')
  var home = document.getElementById('home')

  draw.style.display = 'none'
  home.style.display = 'block'

}
