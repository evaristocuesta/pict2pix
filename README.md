# Pict2Pix.js
Pict2Pix.js is a creative coding library to apply fancy pixel animations to images.

![Screenshot example](./resources/pict2pix.gif)

# Get started with Pict2Pix

## Setting up a basic skeleton
To get started with Pict2Pix.js library, follow the next steps:
- Include the prict2pix.min.js file.
```html
<script src="https://cdn.jsdelivr.net/gh/evaristocuesta/pict2pix@0.3.0/dist/pict2pix.min.js"></script>
```
- Place an image inside a container because the library will replace the image by a canvas.
```html
<div id="div1">
    <img id="image-jh" src="images/jimi-hendrix.jpg">
</div>
```
- Get the image element and call to pict2pix.animate function.
```javascript
const image = document.getElementById('image-jh');
window.onload = function initialize() {
    pict2pix.animate({
        image: image,
        numberOfParticles: 800,
        horizontalSpeed: 1,
        verticalSpeed: -1,
        particleType: 'twisted-particle'
    });
}
```

## Full basic skeleton code

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
    <script src="https://cdn.jsdelivr.net/gh/evaristocuesta/pict2pix@0.3.0/dist/pict2pix.min.js"></script>
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
        numberOfParticles: 800,
        horizontalSpeed: 1,
        verticalSpeed: -1,
        particleType: 'twisted-particle'
    });
}
```

Take a look at https://evaristocuesta.github.io/pict2pix/ for more examples code.

## Contributors
- [Evaristo Cuesta](https://evaristocuesta.com)
- [Frank Laboratory](https://www.youtube.com/c/Frankslaboratory/)
