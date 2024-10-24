const fs = require('fs');

// Access environment variables from the Node.js environment
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Log to verify if the environment variables are being picked up
console.log('USER_POOL_ID:', userPoolId);
console.log('CLIENT_ID:', clientId);

// Read the app.js file from the root directory
const appJsPath = './app.js';  // Your original app.js location
let jsContent;

try {
    jsContent = fs.readFileSync(appJsPath, 'utf8');
    console.log('app.js read successfully');
} catch (error) {
    console.error('Error reading app.js:', error);
}

// Inject the environment variables at the top of app.js
if (jsContent) {
    jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

    // Write the modified content back to app.js
    try {
        fs.writeFileSync(appJsPath, jsContent);
        console.log('Environment variables injected into app.js successfully');
    } catch (error) {
        console.error('Error writing app.js:', error);
    }
} else {
    console.error('app.js content is empty or not found');
}
