const jwt=require('jsonwebtoken');


const isLoggedIn=async(req, res, next)=>
{
    //Token extract
    try {
        console.log(req.cookies);
        let token=req.cookies?.token;
        console.log('token found:',token?"yes":"no");
        if(!token)
        {
            console.log("No token");
            return res.status(401).json({
                success:false,
                message:"Authentication failed"
            })
        }

        //Token verify and decode same token as created during login
        const decoded=jwt.verify(token,"shhhhh");
        console.log(decoded);
        //created a object user in req and passed the decoded data to it
        req.user=decoded;
        next();

    } catch (error) {
        console.log("Auth Middleware error:",error);
        return res.status(401).json({
            success:false,
            message:"Authentication failed"
        })
    }
};

module.exports={isLoggedIn};