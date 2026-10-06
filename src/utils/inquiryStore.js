import { useState, useEffect } from "react";

const INQUIRIES_STORAGE_KEY = "malik_portfolio_inquiries";
const INQUIRIES_UPDATE_EVENT = "malik_portfolio_inquiries_updated";

export function getStoredInquiries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse inquiries", e);
    return [];
  }
}

export function saveInquiry(inquiry) {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredInquiries();
    const newEntry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: new Date().toISOString(),
      read: false,
      ...inquiry,
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(INQUIRIES_UPDATE_EVENT));
    return newEntry;
  } catch (e) {
    console.error("Failed to save inquiry", e);
  }
}

export function markInquiryRead(id) {
  const current = getStoredInquiries();
  const updated = current.map(item => item.id === id ? { ...item, read: true } : item);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(INQUIRIES_UPDATE_EVENT));
}

export function deleteInquiry(id) {
  const current = getStoredInquiries();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(INQUIRIES_UPDATE_EVENT));
}

export function clearAllInquiries() {
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([]));
  window.dispatchEvent(new Event(INQUIRIES_UPDATE_EVENT));
}

export function useInquiries() {
  const [inquiries, setInquiries] = useState(getStoredInquiries);

  useEffect(() => {
    const handleUpdate = () => {
      setInquiries(getStoredInquiries());
    };

    window.addEventListener(INQUIRIES_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(INQUIRIES_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    inquiries,
    saveInquiry,
    markInquiryRead,
    deleteInquiry,
    clearAllInquiries,
  };
}
