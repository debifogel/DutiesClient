// models/toran.model.ts
export interface ToranModel {
  id: number;
  name: string;
  email?: string;
  createdDate?: Date;
}

// models/toran-status.model.ts
export interface ToranStatus {
  id: number;
  toranId: number;
  date: Date;
  isCompleted: boolean;
  notes?: string;
  completedAt?: Date;
}

// models/toran-schedule.model.ts
export interface ToranScheduleItem {
  date: string;
  toran: string;
  isCompleted?: boolean;
}

// models/api-response.model.ts
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// models/date-range.model.ts
export interface DateRange {
  fromDate: Date;
  toDate: Date;
}