const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
module.exports = {
            dest: path.resolve(__dirname, '..','..','tmp','uploads'),
            storage: multer.diskStorage({
                destination: (req, file, cb) =>{
                    cb(null, path.resolve(__dirname, '..','..','tmp','uploads'))
                },
                filename: (req, file, cb) => {
                    if(err) cb(err)
                    let data = new Date()
                    const fileName = `${data.getDate()}${data.getMonth()}${data.getFullYear()}-${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}-${file.originalname}`
                    cb(null, fileName);
                }
            }),
            limits:{
                filesize: 20*1024*1024
            },
            fileFilter: (req, file, cb) =>{
                const allowedMimes = ['text/csv', 'text/txt']
                if(allowedMimes.includes(file.mimetype)){
                    cb(null,true);

                }else{
                    cb(new Error('Invalid file type') );
                }
            }

}

  