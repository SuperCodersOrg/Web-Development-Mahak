const fs = require('fs/promises');
const path = require('path');

async function readFileExample(file) {
    try {
        const filename = path.join(__dirname, 'files', file);
        const data = await fs.readFile(filename, 'utf8');
        console.log(data);
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

async function makeFile(file, content) {
    try {
        const filename = path.join(__dirname, 'files', file);
        await fs.mkdir(path.dirname(filename), { recursive: true });
        await fs.writeFile(filename, content, 'utf8');
        console.log("File made successfully");
    } catch (error) {
        console.log('Error while writing a file:', error.message);
    }
}

async function deleteFile(file) {
    try {
        const filename = path.join(__dirname, 'files', file);
        await fs.rm(filename, { force: true });
        console.log("File deleted successfully");
    } catch (error) {
        console.log("Error in deleting the file:", error.message);
    }
}

async function listAllFiles(folder) {
    const filename = path.join(__dirname, folder);
    try {
        const files = await fs.readdir(filename, { withFileTypes: true });
        const fileNames = files.map(file => file.name);
        console.log("All the files in the directory:", fileNames);
    } catch (error) {
        console.log("Error listing the files:", error.message);
    }
}

const command = process.argv[2];

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log(process.argv[3]);
// console.log(process.argv[4]);
// console.log(process.argv[5]);
// console.log(process.argv[6]);
// console.log(process.argv.length);

if (command === "create") {
    const fileName = process.argv[3];
    const content = process.argv.slice(4).join(" ");
    
    if (!fileName) {
        console.log("Please specify a filename.");
    } else {
        makeFile(fileName, content);
    }
}

if (command === "read") {
    readFileExample(process.argv[3]);
}

if (command === "delete") {
    deleteFile(process.argv[3]);
}

if (command === "list") {
    listAllFiles(process.argv[3] || 'files');
}