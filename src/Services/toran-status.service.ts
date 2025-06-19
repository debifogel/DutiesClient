

// services/toran-status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToranStatus } from '../models/Toran';

@Injectable({
  providedIn: 'root'
})
export class ToranStatusService {
  private readonly baseUrl = 'https://your-api-url/api/ToranStatus';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToranStatus[]> {
    return this.http.get<ToranStatus[]>(`${this.baseUrl}/GetAll`);
  }

  getById(id: number): Observable<ToranStatus> {
    return this.http.get<ToranStatus>(`${this.baseUrl}/GetById/${id}`);
  }

  create(status: ToranStatus): Observable<ToranStatus> {
    return this.http.post<ToranStatus>(`${this.baseUrl}/Create`, status);
  }

  update(id: number, status: ToranStatus): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Update/${id}`, status);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Delete/${id}`);
  }
}

