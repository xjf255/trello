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
    workerspace: {
      table: "/table", 
      calendar: '/calendar',
      dashboard: '/dashboard'
    }
  },
  all: '*'
}

export const DAYS = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"]

export const MONTHS = ["January","February","March", "April","May","June","July","August","September","October","November","December"]