import Icon from './beauty.jpg'

function component(){
  var thumbnail = new Image()
  var img = new Image()
  img.onload = function(){
    setTimeout(function(){
      img.classList.add('img-src')
      document.querySelector('.container').appendChild(img)
    }, 1000)
  }
  img.src = Icon.src
  thumbnail.src = Icon.thumbnail
  thumbnail.classList.add('img')
  return thumbnail
}

document.querySelector('.container').appendChild(component())