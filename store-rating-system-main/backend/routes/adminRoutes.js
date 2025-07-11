const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwnerController');
const adminStatsController = require('../controllers/adminStatsController');
// const { verifyToken } = require('../middleware/authMiddleware');

// GET /admin/store-owners
router.get('/store-owners', storeOwnerController.getStoreOwners);
router.post('/stores', storeOwnerController.addStore);
router.get('/all_stores', storeOwnerController.getAllStores);
router.get('/stats', adminStatsController.getAdminStats);

module.exports = router;
