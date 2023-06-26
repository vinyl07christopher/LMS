const isHR = (req, res, next) => {
    if (req.user.role === 'hr') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
  