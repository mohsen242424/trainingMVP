function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  const isDev = process.env.NODE_ENV !== 'production';
  
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: isDev ? err.stack : undefined
  });
}

module.exports = errorHandler;
