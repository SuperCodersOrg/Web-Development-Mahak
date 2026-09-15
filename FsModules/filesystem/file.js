const fs = require('fs');
const path = require('path');

const currentdir = process.argv[2];
const targetext = process.argv[3];
const targetdir = process.argv[4];

if (!fs.existsSync(currentdir)) {
  console.log("Source directory does not exist");
  process.exit(1);
}

if (!fs.existsSync(targetdir)) {
  fs.mkdirSync(targetdir, { recursive: true });
}


function searchFiles(dir) {

  const files = fs.readdirSync(dir, {
    withFileTypes: true
  });

  files.forEach(file => {

    const fullpath = path.join(dir, file.name);

    console.log(file.name);
    
    if (file.isDirectory()) {

      searchFiles(fullpath);

    } else {

      if (path.extname(file.name) === targetext) {

        const destination =
          path.join(targetdir, file.name);

        fs.copyFileSync(fullpath, destination);

        console.log("Copied");
      }
    }
  });
}

searchFiles(currentdir);

// Non-Recursive code

// const currentdir = './filesystem';
// const targetext = '.txt';
// const targetdir = './demo';

// const allfiles = fs.readdirSync(currentdir);

// const matchfiles = allfiles.filter(filename => {
//   return path.extname(filename) === targetext;
// });

// console.log(matchfiles);

// matchfiles.forEach(filename =>{
//   const source = path.join(currentdir,filename);
//   const destination = path.join(targetdir,filename);

//   fs.copyFileSync(source,destination);
//   console.log("copied data");
// })