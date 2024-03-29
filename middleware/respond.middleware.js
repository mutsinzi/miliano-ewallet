const respond = (req, res, next) => {
  res.respond = (data, message = '', statusCode = 200) => {
      res.status(statusCode).json({ status: 'success', data, message });
  };
  next();
};

export default respond;