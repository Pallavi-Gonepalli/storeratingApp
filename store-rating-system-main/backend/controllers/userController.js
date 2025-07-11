// controllers/userController.js
const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
  console.log('➡️ Received request: GET /all_users');

  const nameFilter = req.query.name;
  console.log('🔍 Query parameter [name]:', nameFilter);

  let sql = 'SELECT id, name, email, role FROM users';
  let params = [];

  if (nameFilter && nameFilter.trim() !== '') {
    sql += ' WHERE name LIKE ?';
    params.push(`%${nameFilter}%`);
  }

  console.log('📄 Final SQL:', sql);
  console.log('📌 Params:', params);

  try {
    const [results] = await db.query(sql, params);

    console.log('✅ DB run Successfully');
    res.json(results);
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
