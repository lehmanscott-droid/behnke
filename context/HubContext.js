"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { seedPosts } from "@/lib/seed";

const HubContext = createContext(null);

export function useHub() {
  const ctx = useContext(HubContext);
  if (!ctx) throw new Error("useHub must be used inside <HubProvider>");
  return ctx;
}

const STORAGE = {
  emergency: "wph:emergency",
  posts: "wph:posts",
  dismissed: "wph:dismissed",
};

const CHANNEL = "wicker-park-hub";

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function HubProvider({ children }) {
  // --- Emergency banner state (the real-time stream) ---
  // emergency: null | { id, message, level: "alert" | "notice", createdAt }
  const [emergency, setEmergency] = useState(null);
  const [dismissedId, setDismissedId] = useState(null);

  // --- Community feed state ---
  const [posts, setPosts] = useState(seedPosts);

  const [hydrated, setHydrated] = useState(false);
  const channelRef = useRef(null);

  // Hydrate from localStorage + open the cross-tab broadcast channel so that
  // an emergency published in one tab appears instantly in every open tab.
  useEffect(() => {
    try {
      const e = localStorage.getItem(STORAGE.emergency);
      if (e) setEmergency(JSON.parse(e));
      const p = localStorage.getItem(STORAGE.posts);
      if (p) setPosts(JSON.parse(p));
      const d = localStorage.getItem(STORAGE.dismissed);
      if (d) setDismissedId(d);
    } catch {
      /* ignore malformed storage */
    }

    let ch = null;
    if (typeof BroadcastChannel !== "undefined") {
      ch = new BroadcastChannel(CHANNEL);
      ch.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === "emergency") setEmergency(payload);
        else if (type === "posts") setPosts(payload);
      };
      channelRef.current = ch;
    }

    setHydrated(true);
    return () => ch && ch.close();
  }, []);

  const broadcast = useCallback((type, payload) => {
    try {
      channelRef.current?.postMessage({ type, payload });
    } catch {
      /* channel unavailable */
    }
  }, []);

  // Persist emergency + posts whenever they change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (emergency) localStorage.setItem(STORAGE.emergency, JSON.stringify(emergency));
      else localStorage.removeItem(STORAGE.emergency);
    } catch {}
  }, [emergency, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE.posts, JSON.stringify(posts));
    } catch {}
  }, [posts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (dismissedId) localStorage.setItem(STORAGE.dismissed, dismissedId);
      else localStorage.removeItem(STORAGE.dismissed);
    } catch {}
  }, [dismissedId, hydrated]);

  // --- Emergency actions ---
  const publishEmergency = useCallback(
    (message, level = "alert") => {
      const trimmed = message.trim();
      if (!trimmed) return;
      const next = {
        id: newId(),
        message: trimmed,
        level,
        createdAt: Date.now(),
      };
      setEmergency(next); // instant, reactive update across the app
      setDismissedId(null); // a new alert un-dismisses the banner
      broadcast("emergency", next);
    },
    [broadcast]
  );

  const clearEmergency = useCallback(() => {
    setEmergency(null);
    broadcast("emergency", null);
  }, [broadcast]);

  const dismissEmergency = useCallback(() => {
    if (emergency) setDismissedId(emergency.id);
  }, [emergency]);

  // The banner is visible only when there is an active emergency the current
  // reader has not personally dismissed.
  const bannerVisible = Boolean(emergency) && emergency?.id !== dismissedId;

  // --- Feed actions ---
  const addPost = useCallback(
    ({ category, author, title, body }) => {
      const post = {
        id: newId(),
        category,
        author: author.trim() || "Anonymous Neighbor",
        title: title.trim(),
        body: body.trim(),
        createdAt: Date.now(),
        helpful: 0,
        reported: false,
      };
      setPosts((prev) => {
        const next = [post, ...prev];
        broadcast("posts", next);
        return next;
      });
    },
    [broadcast]
  );

  const upvotePost = useCallback(
    (id) => {
      setPosts((prev) => {
        const next = prev.map((p) =>
          p.id === id ? { ...p, helpful: p.helpful + 1 } : p
        );
        broadcast("posts", next);
        return next;
      });
    },
    [broadcast]
  );

  const reportPost = useCallback(
    (id) => {
      setPosts((prev) => {
        const next = prev.map((p) =>
          p.id === id ? { ...p, reported: !p.reported } : p
        );
        broadcast("posts", next);
        return next;
      });
    },
    [broadcast]
  );

  const value = {
    // emergency
    emergency,
    bannerVisible,
    publishEmergency,
    clearEmergency,
    dismissEmergency,
    // feed
    posts,
    addPost,
    upvotePost,
    reportPost,
    // meta
    hydrated,
  };

  return <HubContext.Provider value={value}>{children}</HubContext.Provider>;
}
