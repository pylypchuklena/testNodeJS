module.exports = function apiRoutesSetup(app){

  const apiRoutes = require('./profile');
  app.use('/api', apiRoutes);
  const orderRoutes = require('./order');
  app.use('/api', orderRoutes);
  const serviceRoutes = require('./service');
  app.use('/api', serviceRoutes);
}
