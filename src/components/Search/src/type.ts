export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl"

export type Responsive = {
  span?: number
  offset?: number
}

export type SearchCol = number | Record<BreakPoint, number>

export const FormSymbol = Symbol("search-form")
