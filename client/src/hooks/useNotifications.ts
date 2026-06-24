import { useCallback, useEffect, useState } from "react";

type Notification = {
  id_notification: number;
  message: string;
  is_read: boolean;
  created_at: string;
  type: string;
  id_user: number;
  id_appointment: number | null;
};

const API_URL = import.meta.env.VITE_API_URL;

function useNotifications(userId: number) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetch_ = useCallback(() => {
    fetch(`${API_URL}/api/notifications/${userId}`)
      .then((res) => res.json())
      .then((data: Notification[]) => setNotifications(data))
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    fetch_();
    const interval = setInterval(fetch_, 30_000);
    return () => clearInterval(interval);
  }, [fetch_]);

  const markRead = async (id: number) => {
    await fetch(`${API_URL}/api/notifications/${id}/read`, { method: "PUT" });
    setNotifications((prev) =>
      prev.map((n) => (n.id_notification === id ? { ...n, is_read: true } : n)),
    );
  };

  const markAllRead = async () => {
    await fetch(`${API_URL}/api/notifications/user/${userId}/read-all`, {
      method: "PUT",
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return { notifications, unreadCount, markRead, markAllRead };
}

export default useNotifications;
