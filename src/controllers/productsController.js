require('dotenv/config');

const getByCategoryTV = (req, res, next) => {
  const { q } = req.query;
  try {
  } catch (error) {
    console.log('Error controller getByCategoryTV');
    return next({ message: error.message });
  }
};
