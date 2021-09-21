import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
  }

}
