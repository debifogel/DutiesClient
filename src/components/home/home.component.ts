// components/home/home.component.ts
import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ToranWeeklyService, DateService } from '../../Services/toran-weekly.service';
import { ToranService } from '../../Services/toran.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToranStatusService } from '../../Services/toran-status.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FormsModule, RouterOutlet,DatePipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nextFridayDate: Date = new Date();
  nextFridayToran!: { name: string; email?: string; phone?: string; } | null;
  isCompleted: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  selectedToranName: string = '';
  employees: any[] = [];
  selectedEmployee: any = null;
  selectionMessage: string = '';
  selectedDate: Date = new Date();
  constructor(
    private toranWeeklyService: ToranWeeklyService,
    private dateService: DateService,
    private toranService: ToranService,
    private confirm:ToranStatusService
  ) {}
  

  ngOnInit() {
    this.loadNextFridayToran();
  }

  private loadNextFridayToran() {
    this.isLoading = true;
    this.nextFridayDate = this.dateService.getNextFriday();
    
    this.toranWeeklyService.getToranForDate(this.nextFridayDate).subscribe({
      next: (result) => {
        this.nextFridayToran = result;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading toran for next Friday:', error);
        this.errorMessage = 'שגיאה בטעינת נתוני התורנות';
        this.isLoading = false;
      }
    });
  }


  openEmployeeModal() {
    this.isModalOpen = true;
    this.toranService.getAll().subscribe({
      next: (result) => {
        this.employees = result;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  confirmSelection() {
    if (this.selectedToranName!== '') {
    let toran = {
      date: new Date(this.selectedDate),
      toran: this.selectedToranName,
    };
    
      this.confirm.create(toran).subscribe({
        next: async () => {
      this.selectionMessage = `התורנות אושרה בהצלחה`;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.isModalOpen = false;
    } });}
    else {
      this.selectionMessage = '❌ יש לבחור עובד לפני אישור';
      console.log(this.selectedEmployee);
    }
  }

 closeModal() {
  this.isModalOpen = false;
 }
}