import React, { useEffect, useState, useRef } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:4000/api/notifications', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success) setNotifications(data.data.notifications || []);
      } catch (e) {
        console.error('Failed to load notifications', e);
      }
    };

    if (currentUser?.id) fetchNotifications();
  }, [currentUser]);

  useEffect(() => {
    const onClick = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/notifications/${id}/read`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      }
    } catch (e) {
      console.error('Failed to mark notification read', e);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <strong>Notifications</strong>
            <button onClick={() => setNotifications([])} className="text-sm text-gray-500">Clear</button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No notifications</div>
            )}
            {notifications.map(n => (
              <div key={n._id} className={`p-3 flex items-start gap-3 hover:bg-gray-50 ${n.read ? 'opacity-80' : 'bg-white'}`}>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(n.created_at || n.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {!n.read ? (
                    <button onClick={() => markRead(n._id)} className="p-1 rounded-md bg-blue-50 text-blue-600 text-xs">Mark</button>
                  ) : (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
