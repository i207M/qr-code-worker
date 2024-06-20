const qr = require('qr-image');

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (request.method === 'POST') {
			return generateQRCode(await request.json());
		} else if (request.method === 'GET' && url.searchParams.has('text')) {
			const text = url.searchParams.get('text');
			return generateQRCode({ text });
		}

		return new Response(landing, {
			headers: {
				'Content-Type': 'text/html',
			},
		});
	},
};

async function generateQRCode({ text }) {
	const headers = { 'Content-Type': 'image/png' };
	const qr_png = qr.imageSync(text || 'NULL');

	return new Response(qr_png, { headers });
}

const landing = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 90%;
        }
        h1 {
            color: #333333;
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        #qr {
            display: none; /* Initially hide the QR code image */
            margin-top: 20px;
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>QR Code Generator</h1>
        <input type="text" id="text" placeholder="Enter text or URL" value="">
        <button onclick="generate()">Generate QR Code</button>
        <div id="qr-container">
            <img id="qr" src="#" alt="Generated QR Code">
        </div>
    </div>
    <script>
        function generate() {
            const text = document.querySelector("#text").value.trim();
            if (text !== "") {
                fetch(window.location.pathname, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: text })
                })
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        document.querySelector("#qr").src = reader.result;
                        document.querySelector("#qr").style.display = "inline-block"; // Show the QR code image
                    }
                    reader.readAsDataURL(blob);
                })
                .catch(error => console.error('Error generating QR code:', error));
            } else {
                alert("Please enter text or URL to generate QR code.");
            }
        }
    </script>
</body>
</html>
`;
