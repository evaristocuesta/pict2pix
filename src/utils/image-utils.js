export {mapImage, calculateRelativeBrightness, reduceImage};

function mapImage(pixels, width, height) {
    let mappedImage = [];
    for (let y = 0; y < height; y++){
        const posY = y * 4 * pixels.width;
        let row = [];
        for (let x = 0; x < width; x++){
            const posX = x * 4;
            const red = pixels.data[posY + posX];
            const green = pixels.data[posY + (posX + 1)];
            const blue = pixels.data[posY + (posX + 2)];
            const alpha = pixels.data[posY + (posX + 3)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = {
                brightness: brightness,
                alpha: alpha,
                color: 'rgb(' + red + ',' + green + ',' + blue + ')'
            };
            row.push(cell);
        }
        mappedImage.push(row);
    }
    return mappedImage;
}

function calculateRelativeBrightness(red, green, blue) {
    return Math.sqrt(
        (red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114
    ) / 100;
}

function reduceImage(image, dotSize) {
    const tempCanvas = document.createElement('canvas');
    const smallWidth = image.width / dotSize;
    const smallHeight = image.height / dotSize;
    tempCanvas.width = smallWidth;
    tempCanvas.height = smallHeight;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(image, 0, 0, smallWidth, smallHeight);
    const imageData = tempCtx.getImageData(0, 0, smallWidth, smallHeight);
    return imageData;
}