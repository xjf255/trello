import { CircleCheckBig, CircleEllipsis, Clock } from "lucide-react"
import { BoardStatus } from "../type"
import { ItemStatusBoard } from "../types"

export const PATHS = {
  default: '/',
  verification: {
    default: '/verification',
    login: '/verification/login',
    signup: '/verification/signup',
    verification: '/verification/two_factor',
    passwordReset: '/verification/password_reset'
  },
  user: {
    settings: '/settings',
    profile: '/profile',
    workerspace: {
      dashboard: '/dashboard',
      documents: "/documents",
      calendar: '/calendar',
      people: '/people',
    }
  },
  all: '*'
}

export const STATUS_BOARD: ItemStatusBoard[] = [
  { value: null, label: "All", icon: null },
  { value: BoardStatus.PENDING, label: "Pending", icon: CircleEllipsis },
  { value: BoardStatus.IN_PROGRESS, label: "In Progress", icon: Clock },
  { value: BoardStatus.DONE, label: "Done", icon: CircleCheckBig }
]

export const STATUS_SELECTED_BOARD = STATUS_BOARD

export const DEFAULT_FORM = {
  taskTitle: "",
  color: "",
  taskDescription: ""
}

export const TASK_COLORS = [
  "FF3B30", // Rojo brillante 🔴
  "FF9500", // Naranja intenso 🟠
  "FFCC00", // Amarillo neón 🟡
  "34C759", // Verde lima 🟢
  "32D4C7", // Turquesa eléctrico 🌊
  "007AFF", // Azul vibrante 🔵
  "AF52DE", // Púrpura fuerte 🟣
  "FF2D55"  // Rosa neón 💖
]

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]