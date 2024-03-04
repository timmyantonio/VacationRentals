import { JobItem } from "./JobItem"

export interface Maintenance {
    id: string
    unit_id: string
    reported_date: string
    description: string
    completion_date: string
    severity: string
    jobItems: JobItem[]
  }