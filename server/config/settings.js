/**
 * Created by boris on 7/2/2017.
 */
const path = require('path')
let rootPath = path.normalize(path.join(__dirname,'/../../'))
module.exports={
    development:{
        rootPath:rootPath,
        db:'mongodb://localhost:27017/mychatapp',
        port:1337
    },
    production:{
        rootPath:rootPath,
        port:process.env.PORT,
	db:'mongodb://admin:admin@ds153422.mlab.com:53422/mychatapp'
    }
}