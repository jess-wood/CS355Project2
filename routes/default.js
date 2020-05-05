const StudentRouter = require('./student');
const schoolRouter = require('./school');
const manufacturerRouter = require('./manufacturer');
const buysRouter = require('./buys');
const nolunchRouter = require('./nolunch');

const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    StudentRouter.routes(),
    schoolRouter.routes(),
    manufacturerRouter.routes(),
    buysRouter.routes(),
    nolunchRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};