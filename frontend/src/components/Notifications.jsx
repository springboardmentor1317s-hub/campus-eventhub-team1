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

  const clearAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/notifications', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        setNotifications([]);
      }
    } catch (e) {
      console.error('Failed to clear notifications', e);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="relative p-1">
        <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold shadow-md border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <strong className="text-gray-800">Notifications</strong>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                  {unreadCount}
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={clearAll} 
                className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No notifications</p>
              </div>
            )}
            {notifications.map(n => (
              <div 
                key={n._id} 
                className={`p-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${n.read ? 'opacity-70' : 'bg-blue-50'}`}
              >
                <div className="flex-1">
                  <p className={`text-sm ${n.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.created_at || n.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  {!n.read ? (
                    <button 
                      onClick={() => markRead(n._id)} 
                      className="p-1.5 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-600 text-xs transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
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

