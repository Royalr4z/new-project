const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        //.all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/freeQuote')
        //.all(app.config.passport.authenticate())
        .post(app.api.freeQuote.save)
        .get(app.api.freeQuote.get)

    app.route('/freeQuote/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.freeQuote.save)
        .get(app.api.freeQuote.getById)
        .delete(app.api.freeQuote.remove)

    app.route('/Blogs')
        //.all(app.config.passport.authenticate())
        .post(app.api.blogs.save)
        .get(app.api.blogs.get)

    app.route('/Blogs/Orderby')
        .get(app.api.blogs.getOrderBy)
}