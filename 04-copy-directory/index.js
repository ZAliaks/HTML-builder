// const fs = require('fs');
// const path = require('path');
// const pathToFile = path.join(__dirname, 'files-copy');

// fs.mkdir(pathToFile,{recursive: true}, (err) => {
//   if (err) throw err;
// });

// fs.readdir(pathToFile, (err, files) => {
//   if (err) throw err;
//   for (let file of files) {
//     fs.unlink(path.join(pathToFile, file), (err) => {
//       if (err) throw err;
//     });  
//   }
// });

// fs.readdir (path.join(__dirname, 'files'), (err, files) => {
//   if (err) throw err;
//   for (let file of files) {
//     fs.writeFile(path.join(pathToFile, file), '', (err) => {
//       if (err) throw err;
//     });
//     fs.copyFile(      
//       path.join(__dirname, 'files', file),
//       path.join(pathToFile, file), err => {
//         if (err) throw err;
//       });    
//   }
// });
const fs = require('fs');
const path = require('path');


function copyFile(pathToFile) {
  fs.readdir(pathToFile, (err, items) => {
    for (let item of items) {
      fs.stat(path.join(pathToFile, `${item}`), (err, data) => {
        if (data.isFile()) {
          createFile(item);
        } else if (data.isDirectory()) {
          createFolder(path.resolve(__dirname, 'files-copy'), `${item}`);
        }
      });
    }
  });
}

function createFile (dataFile) {
  let from = path.resolve(__dirname, 'files', dataFile);
  let to = path.resolve(__dirname, 'files-copy', dataFile);
  fs.copyFile(from, to, () => {});
}

function createFolder(pathDir, name) {
  fs.mkdir(path.join(pathDir, name), () => {});
}

function createDir (pathToCopy) {
  fs.mkdir(pathToCopy, () => {
    copyFile(path.resolve(__dirname, 'files'));
  });
}

function deleteDir (pathToCopy) {
  fs.rm(pathToCopy, {recursive: true}, () => createDir(pathToCopy));
}

function copyDir () {
  deleteDir(path.join(__dirname, 'files-copy'));
}

copyDir();

