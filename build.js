const fs = require('fs');

// Access environment variables
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Log the environment variables for debugging purposes
console.log('USER_POOL_ID:', userPoolId);
console.log('CLIENT_ID:', clientId);


// Read the app.js file from the root directory
let jsContent = fs.readFileSync('./app.js', 'utf8');

// Inject the environment variables at the top of app.js
jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

// Write the modified content back to app.js
fs.writeFileSync('./app.js', jsContent);

console.log('Environment variables injected into app.js');
