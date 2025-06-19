// components/schedule/schedule.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToranScheduleItem } from '../../models/Toran';
import { ToranWeeklyService, DateService } from '../../Services/toran-weekly.service';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
 styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  scheduleItems: ToranScheduleItem[] = [];
  uniqueToranNames: string[] = [];
  
  currentFromDate: Date = new Date();
  currentToDate: Date = new Date();
  selectedFromDate: string = '';
  selectedToDate: string = '';
  selectedToranName: string = '';
  specificDate: string = '';
  
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private toranWeeklyService: ToranWeeklyService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.initializeDates();
    this.loadSchedule();
  }

  private initializeDates() {
    const { fromDate, toDate } = this.dateService.getTwoMonthsFromNow();
    this.currentFromDate = fromDate;
    this.currentToDate = toDate;
    this.selectedFromDate = this.formatDateForInput(fromDate);
    this.selectedToDate = this.formatDateForInput(toDate);
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadSchedule() {
    this.isLoading = true;
    this.errorMessage = '';
    
    const fromDate = new Date(this.selectedFromDate);
    const toDate = new Date(this.selectedToDate);
    
    this.toranWeeklyService.getToranSchedule(fromDate, toDate, this.selectedToranName || undefined)
      .subscribe({
        next: (data) => {
          this.scheduleItems = data;
          this.updateUniqueToranNames();
          this.currentFromDate = fromDate;
          this.currentToDate = toDate;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading schedule:', error);
          this.errorMessage = 'שגיאה בטעינת לוח התורנויות';
          this.isLoading = false;
        }
      });
  }

  private updateUniqueToranNames() {
    this.uniqueToranNames = [...new Set(this.scheduleItems.map(item => item.toran))];
  }

  onDateRangeChange() {
    // עדכון אוטומטי כאשר משנים את התאריכים
  }

  onToranFilterChange() {
    this.loadSchedule();
  }

  onSpecificDateSearch() {
    if (this.specificDate) {
      const searchDate = new Date(this.specificDate);
      this.selectedFromDate = this.formatDateForInput(searchDate);
      this.selectedToDate = this.formatDateForInput(searchDate);
      this.loadSchedule();
    }
  }

  previousMonth() {
    this.currentFromDate.setMonth(this.currentFromDate.getMonth() - 1);
    this.currentToDate.setMonth(this.currentToDate.getMonth() - 1);
    this.selectedFromDate = this.formatDateForInput(this.currentFromDate);
    this.selectedToDate = this.formatDateForInput(this.currentToDate);
    this.loadSchedule();
  }

  nextMonth() {
    this.currentFromDate.setMonth(this.currentFromDate.getMonth() + 1);
    this.currentToDate.setMonth(this.currentToDate.getMonth() + 1);
    this.selectedFromDate = this.formatDateForInput(this.currentFromDate);
    this.selectedToDate = this.formatDateForInput(this.currentToDate);
    this.loadSchedule();
  }

  formatPeriod(fromDate: Date, toDate: Date): string {
    return `${this.dateService.formatDate(fromDate)} - ${this.dateService.formatDate(toDate)}`;
  }

  formatDisplayDate(dateStr: string): string {
    const date = new Date(dateStr);
    return this.dateService.formatDate(date);
  }

  getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return days[date.getDay()];
  }

  isPastDate(dateStr: string): boolean {
    return this.dateService.isPastDate(dateStr);
  }

  isHighlighted(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  getCompletedCount(): number {
    return this.scheduleItems.filter(item => this.isPastDate(item.date)).length;
  }

  getPendingCount(): number {
    return this.scheduleItems.filter(item => !this.isPastDate(item.date)).length;
  }
}