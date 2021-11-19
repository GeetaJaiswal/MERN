import axios from "axios";

// const URL = "http://localhost:8000";

export const getCreatePage = async() => {
    try {
       //await axios.get('/create');
        const response = await fetch(`/create`, {
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })  
        console.log(response);
        return response;
        }
    catch(e) {
        console.log(`problem while calling create get api ${e}`);
    }
}

export const createPost = async(post) => {
    try {
        // return await axios.post(`/create`,post);
        const {title, description, picture, username, category, createDate} = post;
        const res = await fetch('/create', {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json" 
                    },
                    body: JSON.stringify({title, description, picture, username, category, createDate})
                })

        if(res.status===200 )
        {
             window.alert("post created successfully");
            // console.log(res);
              //console.log(data);
         }
         else
         {
            window.alert("Unable to create post");
         }
    }
    catch(error){
        console.log(`error in creeating post is ${error}`);
    }
}


//getting all posts
export const getAllPosts = async(param) => {
    try {
        const response = await fetch(`/posts${param}`, {
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(e) {
        console.log(`while callling getAllPosts api ${e}`);
    }
}

//getting post by id
export const getPost = async(id) => {
    try {
        const response = await fetch(`/post/${id}`, {
            method: "GET",
            header: {
                Accept: "application./json",
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(e) {
        console.log(`while callling getAllPosts api ${e}`);
    }
}

//update post 
export const updatePost = async(id,post) => {
    try {
        const {title, description, picture, username, category, createDate} = post;
        const response = await fetch(`/update/${id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json" 
                        },
                        body: JSON.stringify({title, description, picture, username, category, createDate})
    
        })

         await response.json();
        // return data;
    }
    catch(e) {
        console.log(`while calling updatePost api ${e}`);
    }
}

export const deletePost = async(id) => {
    try {
        const response = await fetch(`/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type":"application/json" 
                        },    
        })

         await response.json();
        // return data;
    }
    catch(e) {
        console.log(`while getting delete post api ${e}`);
    }

}


//upload file
export const uploadFile = async(data) => {
    try {
        return await axios.post('/file/upload',data);
        // const {name, file} = data;
        // const response = await fetch(`/file/upload/`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type":"application/json" 
        //                 },
        //                 body: JSON.stringify({name, file})
    
        // })
        // await response.json();
    }
    catch(e) {
        console.log(`error while fetching uploadFile api ${e}`);
    }
}


//new comment
export const newComment = async(data) => {
    try {
       return await axios.post('/comment', data);
    }
    catch(e) {
        console.log(`error while calling comment api ${e}`);
    }
}

//get comments
export const getComments = async(id) => {
    try {
       const response = await axios.get(`/comments/${id}`);
    //    console.log(response.data);
       return response.data;
    }
    catch(e) {
        console.log(`error while calling comments api ${e}`);
    }
}


//delete comment
export const deleteComment = async(id) => {
    try {
       const response = await axios.delete(`/comment/delete/${id}`);
    }
    catch(e) {
        console.log(`error while calling delete comment api ${e}`);
    }
}



//user Registration
export const getRegisterData = async(data) => {
    try {
        // return await axios.post(`/register`, data);
        const {name, email, password, cpassword, contact, location} = data;
        const res = await fetch('/register', {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json" 
                    },
                    body: JSON.stringify({name, email, password, cpassword, contact, location})
                })

        // console.log(res.status);
        if(res.status===204)
        {
            window.alert("Please fill all the fields");
            return res;
        }        
        else if(res.status===403)
        {
            window.alert("User already exists");
            return res;
        }
        else if(res.status===404)
        {
            window.alert("Passwords are not same");
            return res;
        }
        else if(res.status===500)
        {
            window.alert("failed to register");
            return res;
        }
        else if(res.status===200)
        {
            window.alert("user registered successfully");
            return res;
            
            // console.log(res);
              //console.log(data);
         }
         else
         {
            window.alert("Unable to register user");
         }
    }
    catch(e) {
        console.log(`error while calling user register api ${e}`);
    }
}


//user login
export const LoginUser = async(data) => {
    try {
        // const history = useHistory();
        const {email, password} = data;
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        })
        
        console.log(response);
        
        if(response.status===204)
        {
            window.alert("Please fill all fields");
        }
        else if(response.status===400)
        {
            window.alert("Invalid Details");
        }
        else if(response.status===403)
        {
            window.alert("You are not yet registered");
        }
        else if(response.status===200)
        {
            // window.alert("You are logged in");
            return response;
        }
    }
    catch(e) {
        console.log(`error while calling user login api ${e}`);
    }
}