const markersRouter = require('./markers');
const searchRouter = require('./search');
const userRouter = require('./user');
const authRouter = require('./auth');

module.exports = (app) => {
    app.use('/markers', markersRouter);
    app.use('/search', searchRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use((req, res) => {
        res.status(404).json({message: 'err 404, la ressource demandée n\'existe pas'});
    })
}