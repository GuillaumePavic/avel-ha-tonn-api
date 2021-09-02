const markersRouter = require('./markers');
const searchRouter = require('./search');
const usersRouter = require('./users');
const authRouter = require('./auth');

module.exports = (app) => {
    app.use('/markers', markersRouter);
    app.use('/search', searchRouter);
    app.use('/user', usersRouter);
    app.use('/auth', authRouter);
    app.use((req, res) => {
        res.status(404).json({message: 'la ressource demandée n\'existe pas'});
    })
}