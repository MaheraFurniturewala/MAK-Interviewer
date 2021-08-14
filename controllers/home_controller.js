module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect(`/users/dashboard/${req.user.id}`);
    }
    return res.render('home.ejs');
}
