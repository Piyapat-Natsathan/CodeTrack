import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const [days, setDays] = useLocalStorage("codetrack-days", []);
  const [toast, setToast] = useState({ message: '', visible: false })
  const [currentDayId, setCurrentDayId] = useState(null);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const showToast = (message) => {
  setToast({ message, visible: true })
  setTimeout(() => setToast({ message: '', visible: false }), 2500)
}

  // เพิ่มวันใหม่
  const addDay = () => {
    const newDay = {
      id: "day-" + Date.now(),
      num: days.length + 1,
      title: "",
      durationMinutes: 120,
      topics: [],
      exercises: [],
    };
    setDays((prev) => [...prev, newDay]);
    setCurrentDayId(newDay.id);
  };

  // ลบวัน
  const deleteDay = (id) => {
    setDays((prev) => prev.filter((d) => d.id !== id));
    setCurrentDayId((current) => (current === id ? null : current));
  };

  // อัปเดตข้อมูลวัน
  const updateDay = (id, changes) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...changes } : d)),
    );
  };

  const currentDay = days.find((d) => d.id === currentDayId) || null;

  return (
    <ScheduleContext.Provider
      value={{
        days,
        currentDay,
        currentDayId,
        setCurrentDayId,
        addDay,
        deleteDay,
        updateDay,
        showTimerModal,
        setShowTimerModal,
        toast, 
        showToast,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

// Custom hook ใช้งานง่าย
export const useSchedule = () => {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be inside ScheduleProvider");
  return ctx;
};
