import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'api/projects';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  private log(message: string) {
    this.messageService.add(`ProjectService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(_ => this.log('fetched projects')),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      tap(_ => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(this.projectsUrl, project, this.httpOptions).pipe(
      tap(_ => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
      catchError(this.handleError<Project>('addProject'))
    );
  }

  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
  
    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }

}
