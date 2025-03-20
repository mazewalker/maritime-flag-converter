document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('inputText');
    const widthInput = document.getElementById('imageWidth');
    const formatInput = document.getElementById('imageFormat');
    const generateButton = document.getElementById('generateButton');
    const downloadLink = document.getElementById('downloadLink');
    const flagDisplay = document.getElementById('flagDisplay');
    const flagCanvas = document.getElementById('flagCanvas');
    const flagStyleRadios = document.getElementsByName('flagStyle');
    
    // Maritime code names for each character
    const codeNames = {
        'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
        'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet',
        'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
        'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
        'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
        'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
        '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
    };

    // Function to get the selected flag style
    const getSelectedFlagStyle = () => {
        for (const radio of flagStyleRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'bordered'; // Default to bordered
    };

    // Function to generate the image
    const generateImage = () => {
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text');
            return;
        }

        const width = parseInt(widthInput.value);
        const format = formatInput.value;
        const flagStyle = getSelectedFlagStyle();
        
        // Determine the base path for flags based on style
        const basePath = flagStyle === 'bordered' 
            ? 'assets/flags/bordered/' 
            : 'assets/flags/borderless/';

        // Convert text to flag paths
        const flagPaths = [];
        const validChars = [];
        for (let char of text.toUpperCase()) {
            if (/[A-Z0-9]/.test(char)) {
                flagPaths.push(`${basePath}${char.toLowerCase()}.svg`);
                validChars.push(char);
            }
        }

        if (flagPaths.length === 0) {
            alert('Please enter at least one valid character (A-Z, 0-9)');
            return;
        }

        // Generate flag image
        const canvas = document.getElementById('flagCanvas');
        const context = canvas.getContext('2d');
        const flagWidth = width / flagPaths.length;
        const flagHeight = flagWidth; // Square flags

        canvas.width = width;
        canvas.height = flagHeight;
        canvas.style.display = 'block';
        
        // Clear previous display
        flagDisplay.innerHTML = '';
        
        // Create preview
        const promises = flagPaths.map((flagPath, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = flagPath;
                img.onload = () => {
                    context.drawImage(img, index * flagWidth, 0, flagWidth, flagHeight);
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${flagPath}`);
                    resolve(); // Resolve anyway to prevent blocking
                };
            });
        });

        Promise.all(promises).then(() => {
            let imageData;
            if (format === 'svg') {
                // For SVG we need a different approach (in a real app)
                imageData = canvas.toDataURL('image/png');
            } else {
                imageData = canvas.toDataURL(`image/${format}`);
            }
            
            downloadLink.href = imageData;
            downloadLink.download = `maritime_flags.${format}`;
            downloadLink.style.display = 'block';
            downloadLink.textContent = `Download ${format.toUpperCase()} Image`;
            
            // Create and display the code names
            const codeNameDisplay = document.createElement('div');
            codeNameDisplay.id = 'codeNameDisplay';
            codeNameDisplay.classList.add('code-names');
            
            // Generate code name text
            const codeNameText = validChars.map(char => codeNames[char] || char).join(' ');
            codeNameDisplay.textContent = codeNameText;
            
            // Remove any existing code name display
            const existingCodeNameDisplay = document.getElementById('codeNameDisplay');
            if (existingCodeNameDisplay) {
                existingCodeNameDisplay.remove();
            }
            
            // Add the new code name display after the download link
            downloadLink.insertAdjacentElement('afterend', codeNameDisplay);
        });
    };

    // Add click event listener to the button
    generateButton.addEventListener('click', generateImage);

    // Add keydown event listeners to input fields
    const inputFields = [textInput, widthInput, formatInput];
    inputFields.forEach(input => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                generateImage();
            }
        });
    });
});