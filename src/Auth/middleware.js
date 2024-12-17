const adminAuth = (req,res,next)=>{
  const token = "xyz"
  if(token==="xyz"){
    next();
  }
  else{
    res.status(401).send("unathourised user");
  }
};


const userAuth = (req,res,next)=>{
  const token = "xyz"
  if(token==="xyz"){
    next();
  }
  else{
    res.status(401).send("unathourised user");
  }
};
module.exports ={ userAuth ,adminAuth }
  