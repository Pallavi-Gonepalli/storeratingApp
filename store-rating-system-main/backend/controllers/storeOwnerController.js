const db = require('../config/db');

exports.getStoreOwners = async (req, res) => {
  console.log('➡️ [getStoreOwners] Received request: GET /admin/store-owners');

  try {
    console.log('🔍 [getStoreOwners] Verifying request headers...');
    const authHeader = req.headers.authorization;
    console.log('🔍 [getStoreOwners] Authorization header:', authHeader);

    console.log('📡 [getStoreOwners] Querying database for store owners...');
    const [owners] = await db.query(
      'SELECT id, name, email FROM users WHERE role = ?',
      ['Store Owner']
    );

    console.log(`✅ [getStoreOwners] Found ${owners.length} store owners.`);
    console.table(owners);

    res.status(200).json(owners);
  } catch (err) {
    console.error('❌ [getStoreOwners] Error fetching store owners:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addStore = async (req, res) => {
  console.log('➡️ [addStore] Received request: POST /admin/stores');
  const { name, email, address, owner_id } = req.body;

  console.log('📦 [addStore] Data received:', { name, email, address, owner_id });

  if (!name || !owner_id) {
    return res.status(400).json({ message: 'Name and owner_id are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );

    console.log('✅ [addStore] Store inserted with ID:', result.insertId);

    res.status(201).json({
      message: 'Store created successfully',
      storeId: result.insertId
    });
  } catch (err) {
    console.error('❌ [addStore] Error inserting store:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getAllStores = async (req, res) => {
  console.log('➡️ [getAllStores] Received request: GET /admin/stores');

  try {
    const [stores] = await db.query(
      `
      SELECT 
        stores.id,
        stores.name,
        stores.email,
        stores.address,
        users.name AS owner_name,
        users.email AS owner_email
      FROM stores
      LEFT JOIN users ON stores.owner_id = users.id
      `
    );

    console.log(`✅ [getAllStores] Found ${stores.length} stores`);
    res.status(200).json(stores);
  } catch (err) {
    console.error('❌ [getAllStores] Error fetching stores:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};