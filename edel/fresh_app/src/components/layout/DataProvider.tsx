"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { User, WellnessEntry, Appointment, Disorder, CBTExercise, GameSession, VentPost } from "@/types";
import { I18nProvider } from "@/lib/i18n";

interface AppDataContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  wellnessEntries: WellnessEntry[];
  addWellnessEntry: (entry: Omit<WellnessEntry, "id" | "createdAt">) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void;
  disorders: Disorder[];
  cbtExercises: CBTExercise[];
  gameSessions: GameSession[];
  ventPosts: VentPost[];
  isLoading: boolean;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [wellnessEntries, setWellnessEntries] = useState<WellnessEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [disorders] = useState<Disorder[]>([]);
  const [cbtExercises] = useState<CBTExercise[]>([]);
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [ventPosts] = useState<VentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("mindwell-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedWellness = localStorage.getItem("mindwell-wellness");
    if (storedWellness) {
      setWellnessEntries(JSON.parse(storedWellness));
    }
    const storedAppointments = localStorage.getItem("mindwell-appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
    const storedGames = localStorage.getItem("mindwell-games");
    if (storedGames) {
      setGameSessions(JSON.parse(storedGames));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("mindwell-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mindwell-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("mindwell-wellness", JSON.stringify(wellnessEntries));
  }, [wellnessEntries]);

  useEffect(() => {
    localStorage.setItem("mindwell-appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("mindwell-games", JSON.stringify(gameSessions));
  }, [gameSessions]);

  const addWellnessEntry = useCallback((entry: Omit<WellnessEntry, "id" | "createdAt">) => {
    const newEntry: WellnessEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setWellnessEntries((prev) => [newEntry, ...prev]);
  }, []);

  const addAppointment = useCallback((appointment: Omit<Appointment, "id" | "createdAt">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        user,
        setUser,
        wellnessEntries,
        addWellnessEntry,
        appointments,
        addAppointment,
        disorders,
        cbtExercises,
        gameSessions,
        ventPosts,
        isLoading,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("mindwell-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = stored || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("mindwell-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  const setThemeDirect = useCallback((newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("mindwell-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeDirect }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppDataProvider>{children}</AppDataProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}