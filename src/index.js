import { getOptions } from 'loader-utils'
import validateOptions from 'schema-utils'
import { base64 } from './helper.js'
import schema from './options.json'

export default function loader(content){
  this.cacheable && this.cacheable()
  const opts = getOptions(this) || {}
  validateOptions(schema, opts, 'Progressive Img Loader')

  const cb = this.async()
  const ifBase64 = opts.base64 || true
  const file = this.resourcePath
  let contentString = content.toString('utf8')

  // maybe will change to es2015 module exports
  // https://github.com/webpack-contrib/file-loader/blob/master/src/index.js#L82
  const isFileUrlExport = /^module.exports = (.*)/.test(contentString)

  // https://github.com/webpack-contrib/url-loader/blob/master/src/index.js#L39
  const isDataUrlExport = /^module.exports = "data:(.*)base64,(.*)/.test(contentString)

  let source = ""
  if(isDataUrlExport){
    source = contentString.match(/^module.exports = (.*)/)[1]
  }else{
    if(!isFileUrlExport){
      const fileLoader = require('file-loader')
      contentString = fileLoader.call(this, content)
    }
    source = contentString.match(/^module.exports = (.*);/)[1]
  }

  base64(file).then(data => {
    if(data){
      let res = `module.exports = { "src": ${source}`
      if(ifBase64) res+= `, "thumbnail": ${JSON.stringify(data)}`
      res += `};`
      cb(null, res)
    }else{
      cb(err, null)
    }
  }).catch(err => {
    cb(err, null)
  })
}

export const raw = true