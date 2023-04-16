module.exports = (req, res) => {
  const { body, params, query, headers } = req;
  return res.status(501).send({
    message: 'Router not implemented yet!',
    url: req.url,
    method: req.method,
    body,
    params,
    query,
    headers,
  });
};
