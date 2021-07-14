# Pict2Pix.js
Pict2Pix.js is a library to add pixels animation to an image

![Screenshot example](./resources/pict2pix.gif)

## Using Pict2Pix

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" media="screen" href="css/style.css"/>
</head>
<body>
    <div id="div1">
        <img id="image-jh" src="images/jimi-hendrix.jpg">
    </div>
    <script src="https://cdn.jsdelivr.net/gh/evaristocuesta/pict2pix@0.1.1/dist/pict2pix.min.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

### JavaScript
```javascript
const image = document.getElementById('image-jh');
window.onload = function initialize() {
    pict2pix.animate({
        image: image,
        numberOfParticles: 3000,
        horizontalSpeed: 1,
        verticalSpeed: -1,
        particleType: 'twisted-particle'
    });
}
```

### Options
- **image**: Mandatory. It is the image wich you want to add de pixels effect
- **numberOfParticles**: Optional. Number of particles in the image. Be careful about the perfomance if you add a big number of particles. The default value is 3000.
- **horizontalSpeed**: Optional. Horizontal speed of the particles. Can be positive or negative. Zero for no horizontal movement. The default value is 1. 
- **verticalSpeed**: Optional. Vertical speed of the particles. Can be positive or negative. Zero for no vertical movement. The default value is 1. 
- **particleType**: Optional. Type effect. The default value is 'straight-particle'
  - 'straight-particle'
  - 'twisted-particle'

## Contributors
- [Evaristo Cuesta](https://evaristocuesta.com)
- [Frank Laboratory](https://www.youtube.com/c/Frankslaboratory/)
