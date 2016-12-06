var exports = module.exports = {};

exports.entValidation  = function (allowed, reqEnt){
	
    console.log("length reqEnt: " + reqEnt.length);
    var i,j;
    for(i = 0; i < reqEnt.length; i++){
        for(j = 0; j < allowed.length; j++){
            if(allowed[j] === reqEnt[i])
                return true;    
        }
    }
    
    return false;
}