import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
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
    const authentication = [
      {
        email: "test@test.com",
        password: "mdps!cret#30",
        _token: ""
      }
    ];
    return {projects, authentication};
  }
  
  genId(projects: Project[]): number {
    return projects.length > 0 ? Math.max(...projects.map(project => project.id)) + 1 : 4;
  }

  // HTTP POST interceptor
  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'authentication') {
      return this.authenticate(reqInfo)
    }
    return undefined;
  }

  // HTTP POST interceptor handler
  private authenticate(reqInfo: RequestInfo) {
    // return an Observable response
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST api/authentication override')
      const { headers, url, req } = reqInfo;
      
      const { email, password }: any = req.body;
      if (email === 'test@test.com' && password === 'mdps!cret#30') {
        return { 
          status: 200, 
          headers,
          url,
          body: {
            email: email,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
          }
        }

      } 
      return { 
        status: 401, 
        headers, 
        url, 
        body: { } 
      }
    })
  }
}