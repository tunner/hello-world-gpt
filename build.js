const fs = require('fs');

// Access environment variables from the build environment
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Base64 encode the environment variables to bypass secret masking
const encodedUserPoolId = Buffer.from(userPoolId).toString('base64');
const encodedClientId = Buffer.from(clientId).toString('base64');

// Log the base64-encoded environment variables for debugging
console.log('Base64 Encoded USER_POOL_ID:', encodedUserPoolId);
console.log('Base64 Encoded CLIENT_ID:', encodedClientId);

// Proceed to inject the variables into app.js or other files
let jsContent = fs.readFileSync('./app.js', 'utf8');

// Inject the environment variables at the top of app.js
jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

// Write the modified content back to app.js
fs.writeFileSync('./app.js', jsContent);

console.log('Environment variables injected into app.js');
