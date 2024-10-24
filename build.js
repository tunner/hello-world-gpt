const fs = require('fs');

// Access environment variables
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Inject the variables into app.js
let jsContent = fs.readFileSync('./app.js', 'utf8');

// Add global variables for User Pool ID and Client ID at the top of app.js
jsContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + jsContent;

// Write the modified content back to app.js or to ./public/app.js for deployment
fs.writeFileSync('./public/app.js', jsContent);

console.log('Environment variables injected into app.js');
