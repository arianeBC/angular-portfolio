import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  validated = true;
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
  }

  add(title: string, description: string, image: string, categories: string): void {
    title = title.trim();
    description = description.trim();
    image = image.trim();
    categories = categories.trim();
    if (!title || !description || !image || !categories) {
      this.validated = false;
      return; 
    }
    this.projectService.addProject({ title, description, image, categories } as Project)
      .subscribe(project => {
        this.projects.push(project);
      });
  }

  delete(project: Project): void {
    this.projects = this.projects.filter(h => h !== project);
    this.projectService.deleteProject(project.id).subscribe();
  }

}
