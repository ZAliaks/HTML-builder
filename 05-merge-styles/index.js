const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
    if (err) throw err;
  }
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err)  throw err;
  else{
    files.forEach((file) => {
      if (path.extname(file) === '.css') {
        let readStream = fs.createReadStream(path.join(__dirname, 'styles', `${file}`), 'utf-8');
        readStream.on('data', (data) => {
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
            if (err)  throw err;
          });
        });
      }
    });
  }
});