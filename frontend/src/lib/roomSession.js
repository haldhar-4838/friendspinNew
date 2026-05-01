const ROOM_SESSION_KEY = 'friendspin-room-session';

export function readRoomSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(ROOM_SESSION_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

export function saveRoomSession(session) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ROOM_SESSION_KEY, JSON.stringify(session));
}

export function clearRoomSession() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ROOM_SESSION_KEY);
}
