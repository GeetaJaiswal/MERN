const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({ 
    url: 'mongodb+srv://geeta:geeta123@cluster0.ilhtn.mongodb.net/Blog?retryWrites=true&w=majority',
    options : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    file: (request, file) => {
        const match = ['image/png', 'image/jpg']

        if(match.indexOf(file.memeType) === -1)
        {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        else
        {
            return {
                bucketName: "photos",
                filename: `${Date.now()}-blog-${file.originalname}`,
            }
        }
    }
 });

module.exports =  multer({storage});