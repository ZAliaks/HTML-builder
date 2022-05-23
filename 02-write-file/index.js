const fs = require ('fs');
const path = require ('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream (path.join(__dirname, 'text.txt'));
stdout.write('Hi! Ожидание ввода текста. \n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    console.log ('\nBye!');
    process.exit();
  } else {    
    output.write(data);
    stdout.write('Файл изменен, ожидаю дальнейшего ввода данных либо "exit" \n');
  }
});