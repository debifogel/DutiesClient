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
  nextFridayToran: string | null = null;
  isCompleted: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  searchQuery: string = '';
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedEmployee: any = null;
  selectionMessage: string = '';
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


  openEmployeeModal() {
    this.isModalOpen = true;
    this.toranService.getAll().subscribe({
      next: (result) => {
        this.employees = result;
        this.filteredEmployees = result;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  filterEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(query)
    );
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  confirmSelection() {
    if (this.selectedEmployee) {
    let toran = {
      date: this.nextFridayDate.toISOString(),
      toran: this.selectedEmployee.name.toString(),
    };
      this.confirm.create(toran).subscribe({
        next: () => {
      this.selectionMessage = `התורנות אושרה בהצלחה`;
      this.isModalOpen = false;
    } });}
    else {
      this.selectionMessage = '❌ יש לבחור עובד לפני אישור';
    }
  }

 closeModal() {
  this.isModalOpen = false;
 }
}