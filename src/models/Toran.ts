// models/toran.model.ts
export interface ToranModel {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  createdDate?: Date;
}

// models/toran-status.model.ts


// models/toran-schedule.model.ts
export interface ToranStatus {
  date: string;
  toran: string;
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