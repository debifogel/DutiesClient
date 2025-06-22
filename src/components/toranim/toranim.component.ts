// components/toranim/toranim.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToranModel } from '../../models/Toran';
import { ToranService } from '../../Services/toran.service';

@Component({
  selector: 'app-toranim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toranim.component.html',
  styleUrls: ['./toranim.component.css'],
})
export class ToranimComponent implements OnInit {
  toranim: ToranModel[] = [];
  filteredToranim: ToranModel[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';
 
  showForm: boolean = false;
  isEditing: boolean = false;
  currentToran: ToranModel = this.createEmptyToran();
 
  showDeleteConfirm: boolean = false;
  toranToDelete: ToranModel | null = null;

  constructor(private toranService: ToranService) {}

  ngOnInit() {
    this.loadToranim();
  }

  private createEmptyToran(): ToranModel {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      createdDate: new Date(),
    };
  }

  private loadToranim() {
    this.isLoading = true;
    this.toranService.getAll().subscribe({
      next: (data) => {
        this.toranim = data;
        this.filteredToranim = [...data];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading toranim:', error);
        this.errorMessage = 'שגיאה בטעינת רשימת התורנים';
        this.isLoading = false;
      }
    });
  }

  filterToranim() {
    if (!this.searchTerm.trim()) {
      this.filteredToranim = [...this.toranim];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredToranim = this.toranim.filter(toran =>
        toran.name.toLowerCase().includes(term) ||
        (toran.email && toran.email.toLowerCase().includes(term)) ||
        (toran.phone && toran.phone.toLowerCase().includes(term))
      );
    }
  }

  openAddForm() {
    this.isEditing = false;
    this.currentToran = this.createEmptyToran();
    this.showForm = true;
  }

  editToran(toran: ToranModel) {
    this.isEditing = true;
    this.currentToran = { ...toran };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.currentToran = this.createEmptyToran();
    this.isEditing = false;
  }

  saveToran() {
    // וולידציה נוספת לפני שליחה
    if (!this.isValidToran()) {
      this.errorMessage = 'אנא מלא את כל השדות הנדרשים בצורה תקינה';
      return;
    }

    if (this.isEditing) {
      this.toranService.update(this.currentToran.id, this.currentToran).subscribe({
        next: () => {
          this.loadToranim();
          this.closeForm();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error updating toran:', error);
          this.errorMessage = 'שגיאה בעדכון התורן';
        }
      });
    } else {
      this.toranService.create(this.currentToran).subscribe({
        next: () => {
          this.loadToranim();
          this.closeForm();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error creating toran:', error);
          this.errorMessage = 'שגיאה בהוספת התורן';
        }
      });
    }
  }

  private isValidToran(): boolean {
    // בדיקת שם
    if (!this.currentToran.name?.trim()) {
      return false;
    }

    // בדיקת פלאפון - חובה ובפורמט נכון
    if (!this.currentToran.phone?.trim()) {
      return false;
    }

    // בדיקת פורמט פלאפון ישראלי
    const phonePattern = /^(0[2-9])?[0-9]{1,2}-?[0-9]{7}$|^[0-9]{9,10}$/;
    if (!phonePattern.test(this.currentToran.phone.replace(/\s/g, ''))) {
      return false;
    }

    // בדיקת אימייל אם הוזן
    if (this.currentToran.email?.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.currentToran.email)) {
        return false;
      }
    }

    return true;
  }

  confirmDelete(toran: ToranModel) {
    this.toranToDelete = toran;
    this.showDeleteConfirm = true;
  }

  deleteToran() {
    if (!this.toranToDelete) return;
    
    this.toranService.delete(this.toranToDelete.id).subscribe({
      next: () => {
        this.loadToranim();
        this.cancelDelete();
      },
      error: (error) => {
        console.error('Error deleting toran:', error);
        this.errorMessage = 'שגיאה במחיקת התורן';
        this.cancelDelete();
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.toranToDelete = null;
  }
}