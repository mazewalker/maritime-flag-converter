function convertTextToFlags(text) {
    const flagMap = {
        'A': 'assets/flags/a.svg',
        'B': 'assets/flags/b.svg',
        'C': 'assets/flags/c.svg',
        // Continue mapping for all letters...
        'Z': 'assets/flags/z.svg'
    };

    const flags = [];
    for (let char of text.toUpperCase()) {
        if (flagMap[char]) {
            flags.push(flagMap[char]);
        }
    }
    return flags;
}

function createFlagImageSequence(flags, width) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const flagWidth = width / flags.length;
    const flagHeight = flagWidth; // Assuming square flags

    canvas.width = width;
    canvas.height = flagHeight;

    let promises = flags.map((flag, index) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = flag;
            img.onload = () => {
                context.drawImage(img, index * flagWidth, 0, flagWidth, flagHeight);
                resolve();
            };
        });
    });

    return Promise.all(promises).then(() => canvas.toDataURL());
}

function downloadImage(dataUrl, format) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `maritime_flags.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export { convertTextToFlags, createFlagImageSequence, downloadImage };
