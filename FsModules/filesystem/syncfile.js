const fs = require('fs');

fs.writeFileSync('syncfile.txt','this is a line and \nit is written using write file sync function','utf8');
console.log("file read successfully");
fs.appendFileSync('syncfile.txt','\n this line is appended by appendfilesync function ','utf8');
console.log("file appended successfully");
const data = fs.readFileSync('syncfile.txt','utf8');
console.log(data);
fs.unlinkSync('syncfile.txt');
console.log("File deleted successfully");