# Maritime Flag Converter

A web application that converts English text into international maritime signal flags. This tool allows you to input text and generate a downloadable image with the corresponding maritime flags.

## Features

- Convert text (A-Z, 0-9) into maritime signal flags
- Choose between bordered and borderless flag styles
- Set custom width for the generated image
- Download the result in multiple formats (PNG, JPG, SVG)
- Display the phonetic code names (Alpha, Bravo, Charlie, etc.) for each character
- Responsive design that works on mobile and desktop

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. No build process is required. This is a client-side application that runs directly in the browser.
4. Open `index.html` in your web browser to run the application.

## Usage

1. Enter the text you want to convert in the input field. Only letters A-Z and numbers 0-9 are supported.
2. Set the desired width for the output image.
3. Select the image format (PNG, JPG, or SVG).
4. Choose between bordered or borderless flag styles.
5. Click "Generate Image" or press Enter in any field.
6. The image will be displayed with a download button beneath it.
7. The phonetic code names (Alpha, Bravo, etc.) will appear below the download button.

## How It Works

The application works by:

1. Taking text input from the user
2. Converting each valid character to its corresponding maritime flag SVG
3. Rendering these flags onto an HTML canvas
4. Converting the canvas to the requested image format
5. Creating a download link for the resulting image

## Credits

- Maritime signal flag SVGs are sourced from [SignalFlags.org](https://signalflags.org/flags/), an open-source resource for maritime signal flags.
- Phonetic alphabet code names follow the standard NATO phonetic alphabet used in maritime communications.

## Browser Compatibility

This application works in modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with HTML, CSS, and vanilla JavaScript.
