function generateImageFromFlags(flagsArray, width, format) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const flagWidth = width / flagsArray.length;
    const flagHeight = flagWidth; // Assuming square flags

    canvas.width = width;
    canvas.height = flagHeight;

    const promises = flagsArray.map((flag, index) => {
        return loadImage(flag).then(image => {
            context.drawImage(image, index * flagWidth, 0, flagWidth, flagHeight);
        });
    });

    Promise.all(promises).then(() => {
        const imageData = canvas.toDataURL(`image/${format}`);
        downloadImage(imageData, `maritime_flags.${format}`);
    });
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}