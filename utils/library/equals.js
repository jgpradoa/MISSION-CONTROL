var exports = module.exports = {};

exports.equals = function(objct1, objct2){
	if(JSON.stringify(objct1) === JSON.stringify(objct1))
		return true;
	else
		return false;
}