export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl"

export type Responsive = {
  span?: number
  offset?: number
}

export type Gap = [number, number] | number

export type GridItemProps = {
  offset?: number
  span?: number
  suffix?: boolean
  xs?: Responsive
  sm?: Responsive
  md?: Responsive
  lg?: Responsive
  xl?: Responsive
}
