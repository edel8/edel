export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    language: string;
  };
  createdAt: string;
}

export interface WellnessEntry {
  id: string;
  userId: string;
  mood: number;
  energy: number;
  stress: number;
  sleep: number;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  therapistId: string;
  therapistName: string;
  therapistAvatar?: string;
  type: "therapy" | "psychiatry" | "coaching" | "group";
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  date: string;
  time: string;
  duration: number;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
}

export interface Disorder {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  prevalence: string;
  severity: "mild" | "moderate" | "severe";
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "audio" | "exercise" | "helpline";
  url: string;
  duration?: string;
  description: string;
}

export interface CBTExercise {
  id: string;
  title: string;
  description: string;
  category: "thoughts" | "behaviors" | "emotions" | "core_beliefs";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  steps: ExerciseStep[];
  tags: string[];
}

export interface ExerciseStep {
  id: string;
  instruction: string;
  type: "text" | "input" | "rating" | "choice" | "reflection";
  options?: string[];
  placeholder?: string;
}

export interface GameSession {
  id: string;
  userId: string;
  gameId: string;
  gameName: string;
  score: number;
  duration: number;
  completed: boolean;
  date: string;
  metadata?: Record<string, unknown>;
}

export interface VentPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  category: "vent" | "support" | "celebration" | "question";
  anonymous: boolean;
  likes: number;
  replies: number;
  isLiked: boolean;
  createdAt: string;
  tags: string[];
}

export interface TherapySession {
  id: string;
  userId: string;
  therapistId: string;
  type: "individual" | "couples" | "family" | "group";
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  startTime: string;
  endTime: string;
  notes?: string;
  homework?: HomeworkItem[];
}

export interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  cbtExerciseId?: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: number;
  emotions: string[];
  triggers?: string[];
  notes?: string;
  date: string;
  time: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface SafetyPlan {
  id: string;
  userId: string;
  warningSigns: string[];
  copingStrategies: string[];
  socialContacts: EmergencyContact[];
  professionalContacts: EmergencyContact[];
  emergencyNumbers: EmergencyContact[];
  reasonsToLive: string[];
  environmentSafety: string[];
  lastUpdated: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "appointment" | "reminder" | "message" | "alert" | "system";
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: "text" | "image" | "file" | "system";
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}