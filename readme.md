# progressive-img-loader

a webpack loader for progressive image loading. 

this repo be aimed at how to write a webpack-loader.

## useage

```js
{
  test: /\.(png|jpe?g)$/,
  use: [
    {
      loader: 'progressive-img-loader',
      options: {
        base64: true
      }
    },
    {
      loader: 'url-loader',
      options: {
        limit: 8000
      }
    }
  ]
}

// in component
import icon from './assets/icons/test.png'

// if you hava a component called like 'ProgressiveImage' makes image load progressively.
// the icon.src is the image native source, the icon.thumbnail is thumbnail (base64)
// also you can add 'blur(**px)' make it better
<ProgressiveImage src={icon.thumbnail} data-src={icon.src} />

```

## coordinate

the webpack loader will return the src and thumbnail src, With these two addresses, you can achieve great progressive interaction.

You can use it with a component I wrote earlier. called [react-better-image](https://github.com/cbbfcd/react-better-image);

```js
import img from './assets/imgs/b.png'
//...

<BetterImage
  source={img.src}
  placeholder={img.thumbnail}
  alt={''}
  onload={() => {}}
  // ...
/>
```

## native demo

[demo](./demo/webpack.config.js)

## thx

1. [jimp](https://github.com/oliver-moran/jimp/tree/master/packages/jimp)

2. [file-loader](https://github.com/webpack-contrib/file-loader)

3. [url-loader](https://github.com/webpack-contrib/url-loader)

4. [lqip-loader](https://github.com/zouhir/lqip-loader)

