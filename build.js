const fs = require('fs');
const path = require('path');

// Access environment variables from the Node.js environment
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;

// Ensure the 'dist' directory exists
const distDir = './dist';  
if (!fs.existsSync(distDir)) {
    console.log('Creating dist directory...');
    fs.mkdirSync(distDir);  // Create 'dist' directory if it doesn't exist
}

// Copy or generate index.html, style.css, app.js
const filesToCopy = ['index.html', 'style.css', 'app.js'];

filesToCopy.forEach(file => {
    const sourcePath = `./${file}`;
    const distPath = path.join(distDir, file);

    try {
        let fileContent = fs.readFileSync(sourcePath, 'utf8');
        if (file === 'app.js') {
            // Inject the environment variables into app.js
            fileContent = `const USER_POOL_ID = "${userPoolId}";\nconst CLIENT_ID = "${clientId}";\n` + fileContent;
        }

        // Write to the dist directory
        fs.writeFileSync(distPath, fileContent);
        console.log(`${file} successfully written to dist`);
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
});

console.log('Files in dist:', fs.readdirSync(distDir));  // List contents of dist for verification
