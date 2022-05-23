const fs = require('fs'),
  path = require('path'),
  pathToDist = path.join(__dirname, 'project-dist'),
  pathToStyles = path.join(__dirname, 'styles'),
  pathToAssets = path.join(__dirname, 'assets'),
  pathToIndex = path.join(pathToDist, 'index.html');

fs.mkdir(pathToDist, {recursive: true}, (err) => {
  if(err) throw err;
});

fs.writeFile(path.join(pathToDist, 'style.css'), '', (err)=> {
  if(err) throw err;
});
fs.readdir(pathToStyles, (err, files) => {
  if(err) throw err;
  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      const readStream = fs.createReadStream(path.join(pathToStyles, file), 'utf-8');
      readStream.on('data', (data) => {
        fs.appendFile(path.join(pathToDist, 'style.css'), data, (err) => {
          if(err) throw err;
        });
      });
    }
  });  
});

fs.mkdir(path.join(pathToDist, 'assets'), {recursive: true}, (err) => {
  if(err) throw err;
});
fs.readdir(pathToAssets, (err, files) => {
  if(err) throw err;
  files.forEach((file) => {
    fs.readdir(path.join(pathToAssets, file), (err, dirs) => {
      if(err) throw err;
      fs.mkdir(path.join(pathToDist, 'assets', file), {recursive: true}, (err) => {
        if(err) throw err;
      });
      dirs.forEach((dir) => {
        fs.copyFile(path.join(pathToAssets, file, dir),
          path.join(pathToDist, 'assets', file, dir),
          err => {
            if(err) throw err;
          });
      });
    });
  });    
});    


fs.copyFile(path.join(__dirname, 'template.html'), pathToIndex, (err) => {
  if (err) throw err;
  fs.readFile(pathToIndex, 'utf-8', (err, data) => {
    if(err) throw err;
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true}, (err, tags) => {
      if(err) throw err;
      tags.forEach((tag) => {
        fs.readFile(path.join(__dirname, 'components', tag.name), 'utf-8', (err, tagContent) => {
          if(err) throw err;
          const tagName = `{{${tag.name.split('.')[0]}}}`;
          data = data.replace(tagName, tagContent);
          fs.writeFile(pathToIndex, data, (err) => {
            if(err) throw err;
          });
        });
      });
    });
  });
});
