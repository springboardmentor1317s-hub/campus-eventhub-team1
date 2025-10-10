import React, { useEffect, useState, useRef } from 'react';
import { Bell, X } from 'lucide-react';

// Notifications component: polls the user's registrations and shows approvals
export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // { id, message, timestamp, read }
  const [unreadCount, setUnreadCount] = useState(0);
  const pollingRef = useRef(null);

  const STORAGE_KEY_STATUSES = 'ceh_reg_statuses'; // map regId -> status
  const STORAGE_KEY_UNREAD = 'ceh_unread_notifications'; // array of regIds

  const loadStored = () => {
    try {
      const statuses = JSON.parse(localStorage.getItem(STORAGE_KEY_STATUSES) || '{}');
      const unread = JSON.parse(localStorage.getItem(STORAGE_KEY_UNREAD) || '[]');
      return { statuses, unread };
    } catch (e) {
      return { statuses: {}, unread: [] };
    }
  };

  const saveStored = (statuses, unread) => {
    try {
      localStorage.setItem(STORAGE_KEY_STATUSES, JSON.stringify(statuses));
      localStorage.setItem(STORAGE_KEY_UNREAD, JSON.stringify(unread));
    } catch (e) {
      // ignore
    }
  };

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('http://localhost:4000/api/events/user/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (!data.success || !data.data?.registrations) return;

      const { statuses, unread } = loadStored();
      let updatedStatuses = { ...statuses };
      let updatedUnread = Array.isArray(unread) ? [...unread] : [];
      const newNotifications = [];

      data.data.registrations.forEach(reg => {
        const regId = reg._id || reg.id || (reg._doc && reg._doc._id) || (reg._doc && reg._doc.id);
        const status = reg.status;
        // If status transitioned to approved and we haven't recorded approved before, create notification
        if (status === 'approved' && updatedStatuses[regId] !== 'approved') {
          const message = `Your registration for "${reg.event_id?.title || reg.eventTitle || 'an event'}" has been approved.`;
          const ts = new Date().toISOString();
          newNotifications.push({ id: regId, message, timestamp: ts, read: false });
          if (!updatedUnread.includes(regId)) updatedUnread.push(regId);
        }

        // Update stored status
        updatedStatuses[regId] = status;
      });

      if (newNotifications.length > 0) {
        // prepend new notifications so newest are first
        setNotifications(prev => [...newNotifications, ...prev]);
      }

      // initialize notifications from stored unread if any (helpful after refresh)
      if (notifications.length === 0 && updatedUnread.length > 0) {
        const fromStored = updatedUnread.map(id => ({ id, message: 'You have an approved registration', timestamp: new Date().toISOString(), read: false }));
        setNotifications(prev => [...fromStored, ...prev]);
      }

      setUnreadCount(updatedUnread.length);
      saveStored(updatedStatuses, updatedUnread);
    } catch (error) {
      console.error('Notifications fetch error', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRegistrations();

    // Poll every 25 seconds
    pollingRef.current = setInterval(fetchRegistrations, 25000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      // Mark all unread as read when opening
      const { unread, statuses } = loadStored();
      if (unread.length > 0) {
        // mark notifications as read in state
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        saveStored(statuses, []);
      }
    }
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // remove from unread storage
    const { statuses, unread } = loadStored();
    const updatedUnread = (unread || []).filter(u => u !== id);
    saveStored(statuses, updatedUnread);
    setUnreadCount(updatedUnread.length);
  };

  const markAllRead = () => {
    const { statuses } = loadStored();
    saveStored(statuses, []);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <button className="relative" onClick={toggleOpen} aria-label="Notifications">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <strong>Notifications</strong>
            <div className="flex items-center gap-2">
              <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">Mark all read</button>
              <button onClick={() => { setOpen(false); }} className="text-xs text-gray-500">Close</button>
            </div>
          </div>

          <div className="max-h-64 overflow-auto">
            {notifications.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-600">No notifications</div>
            )}

            {notifications.map(n => (
              <div key={n.id} className={`flex items-start justify-between px-4 py-3 gap-2 ${n.read ? '' : 'bg-blue-50'}`}>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(n.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex items-start flex-col">
                  <button onClick={() => dismissNotification(n.id)} className="text-gray-400 hover:text-gray-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
