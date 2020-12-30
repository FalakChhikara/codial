module.exports.home = function(req,res){
    // res.end('<h1>Falak</h1>');
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('home',{
        title : "home",
    });
}