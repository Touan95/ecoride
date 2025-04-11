const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'dist');

// Function to copy .hbs files
function copyHbsFiles(src, dest) {
    fs.readdir(src, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${src}:`, err);
            return;
        }

        files.forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);

            if (fs.statSync(srcFile).isDirectory()) {
                // Recursively copy files in subdirectories
                fs.mkdirSync(destFile, { recursive: true });
                copyHbsFiles(srcFile, destFile);
            } else if (file.endsWith('.hbs')) {
                // Copy .hbs files and log the action with source and destination
                fs.copyFileSync(srcFile, destFile);
                console.log(`Copied: ${srcFile} to ${destFile}`);
            }
        });
    });
}

// Create the destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Start copying .hbs files
copyHbsFiles(srcDir, destDir);
console.log('Asset copying completed.');