// services/toran.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToranModel } from '../models/Toran';

@Injectable({
  providedIn: 'root'
})
export class ToranService {
  private readonly baseUrl = 'https://toran-management.onrender.com/api/Toran';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToranModel[]> {
    return this.http.get<ToranModel[]>(`${this.baseUrl}/GetAll`);
  }

  getById(id: number): Observable<ToranModel> {
    return this.http.get<ToranModel>(`${this.baseUrl}/GetById/${id}`);
  }

  create(toran: ToranModel): Observable<ToranModel> {
    return this.http.post<ToranModel>(`${this.baseUrl}/Create`, toran);
  }

  update(id: number, toran: ToranModel): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Update/${id}`, toran);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Delete/${id}`);
  }
}