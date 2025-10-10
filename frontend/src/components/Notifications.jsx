import React, { useEffect, useState, useRef } from 'react';
import { Bell, X } from 'lucide-react';

// Notifications component: fetches user's notifications from backend and shows them
export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]); // { id, message, timestamp, read }
  const [unreadCount, setUnreadCount] = useState(0);
  const pollingRef = useRef(null);

  const API_BASE = 'http://localhost:4000/api/notifications';

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (!data.success || !data.data?.notifications) return;

      const notifs = data.data.notifications.map(n => ({
        id: n._id,
        message: n.message,
        timestamp: n.created_at || n.createdAt || n.createdAt,
        read: !!n.read
      }));

      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => !n.read).length);
    } catch (error) {
      console.error('Notifications fetch error', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Poll every 20 seconds
    pollingRef.current = setInterval(fetchNotifications, 20000);
    return () => clearInterval(pollingRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleOpen = async () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen) {
      // Mark all unread as read on the server
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetch(`${API_BASE}/read/all`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
          });
          // update local state
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
          setUnreadCount(0);
        }
      } catch (e) {
        console.error('Failed to mark notifications read', e);
      }
    }
  };

  const dismissNotification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`http://localhost:4000/api/notifications/${id}/read`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }

    setNotifications(prev => prev.filter(n => n.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_BASE}/read/all`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.error('Failed to mark all notifications read', e);
    }
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
