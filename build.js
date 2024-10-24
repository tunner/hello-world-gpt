const fs = require('fs');
const path = require('path');

// Access environment variables from the Node.js environment
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Log to verify if the environment variables are being picked up
console.log('USER_POOL_ID:', userPoolId || 'Not defined');
console.log('CLIENT_ID:', clientId || 'Not defined');

// Exit if environment variables are not defined
if (!userPoolId || !clientId) {
    console.error('Error: USER_POOL_ID and CLIENT_ID environment variables are not defined.');
    process.exit(1); // Exit with an error code
}

// Ensure the 'dist' directory exists
const distDir = './dist';  // You can name this directory anything you like (e.g., 'build', 'public')
if (!fs.existsSync(distDir)) {
    console.log('Creating dist directory...');
    fs.mkdirSync(distDir);  // Create 'dist' directory if it doesn't exist
}

// Copy the original app.js to the 'dist' folder
const sourceAppJsPath = './app.js';  // Your original app.js location
const distAppJsPath = path.join(distDir, 'app.js');

try {
    let jsContent = fs.readFileSync(sourceAppJsPath, 'utf8');
    console.log('app.js read successfully');

    // Inject the environment variables at the top of app.js
    jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

    // Write the modified content to dist/app.js
    fs.writeFileSync(distAppJsPath, jsContent);
    console.log('Environment variables injected into dist/app.js successfully');
} catch (error) {
    console.error('Error processing app.js:', error);
    process.exit(1); // Exit with an error code
}
