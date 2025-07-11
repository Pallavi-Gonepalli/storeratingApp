const db = require('../config/db');

exports.getAdminStats = async (req, res) => {
  console.log('➡️ [getAdminStats] Received request: GET /admin/stats');

  try {
    const [[{ users }]] = await db.query('SELECT COUNT(*) AS users FROM users');
    const [[{ stores }]] = await db.query('SELECT COUNT(*) AS stores FROM stores');
    const [[{ ratings }]] = await db.query('SELECT COUNT(*) AS ratings FROM ratings');

    console.log(`✅ [getAdminStats] Users: ${users}, Stores: ${stores}, Ratings: ${ratings}`);

    res.status(200).json({ users, stores, ratings });
  } catch (err) {
    console.error('❌ [getAdminStats] Error fetching stats:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
