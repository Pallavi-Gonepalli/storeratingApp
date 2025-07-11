module.exports = function validateUser(req, res, next) {
  const { id, name, email, password, address, role, added_by_role } = req.body;

  if (!name || !email || !password || !address || !role) {
    return res.status(400).json({ error: 'All fields (id, name, email, password, address, role) are required.' });
  }

  if (role === 'Store Owner' && added_by_role !== 'System Administrator') {
    return res.status(403).json({ error: 'Only System Administrator can add a Store Owner.' });
  }

  next();
};
