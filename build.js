const fs = require('fs');

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

// Read the app.js file from the root directory
const appJsPath = './app.js';  // Adjust the path if app.js is in a different location
let jsContent;

try {
    jsContent = fs.readFileSync(appJsPath, 'utf8');
    console.log('app.js read successfully');
} catch (error) {
    console.error('Error reading app.js:', error);
    process.exit(1); // Exit with an error code
}

// Inject the environment variables at the top of app.js
jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

// Write the modified content back to app.js
try {
    fs.writeFileSync(appJsPath, jsContent);
    console.log('Environment variables injected into app.js successfully');
} catch (error) {
    console.error('Error writing app.js:', error);
    process.exit(1); // Exit with an error code
}
