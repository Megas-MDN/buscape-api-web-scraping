module.exports = (err, _req, res, _next) => {
  return res
    .status(err.status || 500)
    .send(err.message || 'Internal Server Error not defined!');
};
