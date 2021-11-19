const post = require("../schema/post-schema");

const createPost = async(req,res)=>{
    try{
        console.log(req.body);
        //const post = await new Post(req.body);
        const { title, description, picture, username, category, createDate } = req.body;
        const user = new post({
            title:title,
            description:description,
            picture:picture,
            username:username,
            category:category,
            createDate:createDate
        });
        
        const blogCreated = await user.save();
        if(blogCreated)
            {
                return res.status(200).json({
                    message: "Blog posted successfully"
                });
            }
            else
            {
                return res.status(500).json({
                    message: "unable to create blog"
                });
            }

        // post.save();
        // res.status(200).json({message:'Blog saved'});
    } catch(error){
        res.status(500).json('Blog not saved '+ error)
    }
}

module.exports = createPost;