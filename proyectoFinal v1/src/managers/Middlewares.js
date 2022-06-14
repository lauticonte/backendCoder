const admin = true;

const isAdmin = (req,res,next) => {
    if (!admin){
        return res.status(403).json({error: 403, description: `Not authorized method ${req.method} in this route ${req.originalUrl}`});
    } else {
        return next();
    }
}

const errorHandler = (error, req, res, next) => {
    console.log(error);
    return res.status(400).json({"error": 400, "description": error.message});
}

const notFound = (req, res, next) =>{
    return res.status(400).json({error: 404, description: `Not implemented method`})
}

module.exports = { isAdmin, errorHandler, notFound };