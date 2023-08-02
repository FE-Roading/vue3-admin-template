import pkg from "../../package.json"
import { getEnv, isDevMode } from "./env"

// Generate cache key according to version
export function getStorageShortName() {
  return `${pkg.name}__${pkg.version}__${getEnv()}`.toUpperCase()
}

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// aes encryption key
export const cacheCipher = {
  key: "_110011000001111@",
  iv: "@111111000001111_",
}

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode()

export type BasicStore = any

// token key
export const TOKEN_KEY = "TOKEN__"

export const LOCALE_KEY = "LOCALE__"

// user info key
export const USER_INFO_KEY = "USER__INFO__"

// role info key
export const ROLES_KEY = "ROLES__KEY__"

// project config key
export const PROJ_CFG_KEY = "PROJ__CFG__KEY__"

// lock info
export const LOCK_INFO_KEY = "LOCK__INFO__KEY__"

export const MULTIPLE_TABS_KEY = "MULTIPLE_TABS__KEY__"

export const APP_DARK_MODE_KEY_ = "__APP__DARK__MODE__"

// base global local key
export const APP_LOCAL_CACHE_KEY = "COMMON__LOCAL__KEY__"

// base global session key
export const APP_SESSION_CACHE_KEY = "COMMON__SESSION__KEY__"
