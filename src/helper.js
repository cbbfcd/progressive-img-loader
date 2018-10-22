const Jimp = require('jimp')
const CURR_SUPPORT_MIME = ['image/png', 'image/jpeg', 'image/bmp']

export const base64 = file => {
  return new Promise((resolve, reject) => {
    return Jimp
    .read(file)
    .then(image => image.resize(10, Jimp.AUTO))
    .then(image => {
      const mimeType = image.getMIME()
      if(!~CURR_SUPPORT_MIME.indexOf(mimeType)) return reject(`Error: not support ${mimeType} yet, only support ${CURR_SUPPORT_MIME.join(',')} now`) 
      return image.getBase64(Jimp.AUTO, (err, data) => {
        if(err) return reject(err)
        resolve(data)
      })
    })
    .catch(error => {
      return reject(error)
    })
  })
}