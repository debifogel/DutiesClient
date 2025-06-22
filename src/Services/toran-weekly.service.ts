// services/toran-weekly.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToranWeeklyService {
  private readonly baseUrl = 'https://toran-management.onrender.com/api/ToranWeekly';

  constructor(private http: HttpClient) {}

  getToranForDate(date: Date): Observable<any> {
    const dateStr = date.toISOString().split('T')[0];
    return this.http.get(`${this.baseUrl}/GetToranForDate/${dateStr}`);
  }

  getToranSchedule(fromDate: Date, toDate: Date, name?: string): Observable<ToranStatus[]> {
    const params: any = {
      fromDate: fromDate.toISOString().split('T')[0],
      toDate: toDate.toISOString().split('T')[0]
    };
    
    if (name) {
      params.name = name;
    }

    return this.http.get<ToranStatus[]>(`${this.baseUrl}/GetToranSchedule`, { params });
  }
}

// services/date.service.ts
import { Injectable } from '@angular/core';
import { ToranStatus } from '../models/Toran';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  
  getNextFriday(date: Date = new Date()): Date {
    const nextFriday = new Date(date);
    const daysUntilFriday = (5 - date.getDay() + 7) % 7;
    if (daysUntilFriday === 0 && date.getDay() === 5) {
      nextFriday.setDate(date.getDate() + 7);
    } else {
      nextFriday.setDate(date.getDate() + daysUntilFriday);
    }
    return nextFriday;
  }

  getTwoMonthsFromNow(): { fromDate: Date, toDate: Date } {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 2);
    
    return { fromDate, toDate };
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('he-IL');
  }

  isPastDate(date: string): boolean {
    const checkDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  }
}