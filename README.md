# Cloudflare Worker QR Code Generator

This Cloudflare Worker script generates QR codes based on input text provided either through a POST request or as a GET parameter in the URL. It uses the `qr-image` library to generate QR code images on-the-fly.

## Features

- **POST Request**: Send text data as JSON in a POST request to generate a QR code image.
- **GET Request**: Append `?text=` followed by the text to the worker's URL to generate a QR code image directly from the browser.
- **HTML Landing Page**: A simple HTML landing page is provided to demonstrate the worker's functionality.

## Usage

### Generating QR Codes

1. **Using POST Request**:

   Send a POST request with JSON payload: `{ "text": "Your text here" }`

2. **Using GET Request**:

   Append `?text=Your_text_here` to the worker's URL in the browser.

### Deploying the Worker

Run `npx wrangler deploy` in the root directory.

## License

This project is licensed under the MIT License.
