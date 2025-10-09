const ActivityLog = require('../models/ActivityLog');

// Get all activity logs (admin only)
exports.getActivityLogs = async (req, res) => {
  try {
    // Check if user is admin
    if (!['college_admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { limit = 50, page = 1, action, user_id } = req.query;
    const query = {};

    // Filter by action type if provided
    if (action) {
      query.action = action;
    }

    // Filter by user if provided
    if (user_id) {
      query.user_id = user_id;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await ActivityLog.find(query)
      .populate('user_id', 'name email role')
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ActivityLog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
};

// Get activity log statistics
exports.getLogStats = async (req, res) => {
  try {
    // Check if user is admin
    if (!['college_admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get counts by action type
    const actionCounts = await ActivityLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get recent activity count (last 24 hours)
    const recentActivity = await ActivityLog.countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    // Get total logs
    const totalLogs = await ActivityLog.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        actionCounts,
        recentActivity,
        totalLogs
      }
    });

  } catch (error) {
    console.error('Get log stats error:', error);
    res.status(500).json({ error: 'Failed to fetch log statistics' });
  }
};

// Helper function to create activity log (can be used in other controllers)
exports.createLog = async (userId, action, description, details = {}, ipAddress = null) => {
  try {
    await ActivityLog.create({
      user_id: userId,
      action,
      description,
      details,
      ip_address: ipAddress
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
    // Don't throw error - logging should not break the main operation
  }
};

module.exports = exports;

