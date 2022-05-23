
const fs = require ('fs');
const path = require ('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err)  throw err;     
  for(let file of files) {
    if (file.isFile()) getInfo(file);
  }            
});      

const getInfo = (file) => {
  let info = [];
  fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
    if (err) throw err;
    info.push(file.name.split('.').slice(0, -1).join('.'));
    info.push(path.extname(file.name).slice(1));
    info.push(`${Math.round(stats.size/1.024)/1000}Kb`);
    console.log(info.join(' - '));
  });
};