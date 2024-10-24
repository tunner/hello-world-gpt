const fs = require('fs');

// Access environment variables
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Modify index.html to include these variables (or app.js if you prefer)
let htmlContent = fs.readFileSync('./index.html', 'utf8');

// Inject environment variables in a <script> tag in the HTML
htmlContent = htmlContent.replace(
  '</body>',
  `<script>
    const USER_POOL_ID = "${userPoolId}";
    const CLIENT_ID = "${clientId}";
    console.log('User Pool ID:', USER_POOL_ID);
    console.log('Client ID:', CLIENT_ID);
  </script></body>`
);

// Write the modified HTML to the public folder for deployment
fs.writeFileSync('./public/index.html', htmlContent);

console.log('Environment variables injected into index.html');
