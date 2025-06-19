// components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ToranWeeklyService, DateService } from '../../Services/toran-weekly.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nextFridayDate: Date = new Date();
  nextFridayToran: string | null = null;
  isCompleted: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private toranWeeklyService: ToranWeeklyService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.loadNextFridayToran();
  }

  private loadNextFridayToran() {
    this.isLoading = true;
    this.nextFridayDate = this.dateService.getNextFriday();
    
    this.toranWeeklyService.getToranForDate(this.nextFridayDate).subscribe({
      next: (result) => {
        this.nextFridayToran = result?.name || result?.toran || null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading toran for next Friday:', error);
        this.errorMessage = 'שגיאה בטעינת נתוני התורנות';
        this.isLoading = false;
      }
    });
  }

  updateToranStatus() {
    if (!this.nextFridayToran) return;

    // כאן תוכל להוסיף לוגיקה לעדכון סטטוס התורנות בשרת
    console.log('Updating toran status:', {
      date: this.nextFridayDate,
      toran: this.nextFridayToran,
      completed: this.isCompleted
    });

    // לדוגמה - יצירת אובייקט ToranStatus חדש
    const statusUpdate = {
      id: 0, // יקבל ID מהשרת
      toranId: 0, // צריך למצוא את ה-ID של התורן
      date: this.nextFridayDate,
      isCompleted: this.isCompleted,
      completedAt: this.isCompleted ? new Date() : undefined
    };

    // this.toranStatusService.create(statusUpdate).subscribe({...});
  }
}