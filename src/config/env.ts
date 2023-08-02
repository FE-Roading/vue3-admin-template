/**
 * @description: Development mode
 */
export const developmentMode = "development"

/**
 * @description: Development Online mode
 */
export const devMode = "dev"

/**
 * @description: Test mode
 */
export const testMode = "test"

/**
 * @description: Production mode
 */
export const prodMode = "prod"

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

/**
 * @description: Is it deploy for dev
 * @returns: boolean
 */
export function isDeployForDev(): boolean {
  return getEnv() == devMode
}

/**
 * @description: Is it deploy for test
 * @returns: boolean
 */
export function isDeployForTest(): boolean {
  return getEnv() == testMode
}

/**
 * @description: Is it deploy for test
 * @returns: boolean
 */
export function isDeployForProd(): boolean {
  return getEnv() == prodMode
}
