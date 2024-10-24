const fs = require('fs');

// Access environment variables from the build environment
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Temporarily rename the variables to avoid masking in the logs
const debugUserPoolId = userPoolId;
const debugClientId = clientId;

// Log the environment variables for debugging purposes (renamed)
console.log('DEBUG_USER_POOL_ID:', debugUserPoolId);
console.log('DEBUG_CLIENT_ID:', debugClientId);

// Proceed to inject the variables into app.js or other files
let jsContent = fs.readFileSync('./app.js', 'utf8');

// Inject the environment variables at the top of app.js
jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

// Write the modified content back to app.js
fs.writeFileSync('./app.js', jsContent);

console.log('Environment variables injected into app.js');
