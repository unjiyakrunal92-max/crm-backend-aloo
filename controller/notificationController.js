const Notification = require("../models/notificationModel");

// Get notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error fetching notifications",
    });
  }
};


// Mark one notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error updating notification",
    });
  }
};  