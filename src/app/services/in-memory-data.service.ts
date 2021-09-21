import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {
        id: 1,
        title:"Title", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nesciunt? Animi mollitia deleniti aut id consectetur.",
        image: "assets/img/portfolio-1.jpg",
        categories: "angular, typescript, javascript"
      }, 
      {
        id: 2,
        title:"Title", 
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi fugit incidunt obcaecati ipsam expedita necessitatibus.",
        image: "assets/img/portfolio-2.jpg",
        categories: "springboot, hibernate, java"
      }, 
      {
        id: 3,
        title:"Title", 
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis aut distinctio dolorum dolor sit amet distinctio.",
        image: "assets/img/portfolio-3.jpg",
        categories: "vuejs, javascript"
      },
    ];
    return {projects};
  }
  
  genId(projects: Project[]): number {
    return projects.length > 0 ? Math.max(...projects.map(project => project.id)) + 1 : 4;
  }
}

