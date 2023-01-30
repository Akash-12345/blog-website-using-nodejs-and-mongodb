const fs=require('fs')
const readStream= fs.createReadStream('./docs/blogs.txt',{encoding:'utf-8'});
const writeStream=fs.createWriteStream('./docs/blogs1.txt');
readStream.pipe(writeStream)