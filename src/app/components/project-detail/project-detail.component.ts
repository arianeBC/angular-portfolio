import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/services/project';
import { ProjectService } from 'src/app/services/project.service';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  faAngleDoubleLeft = faAngleDoubleLeft;
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.project) {
      this.projectService.updateProject(this.project)
        .subscribe(() => this.goBack());
    }
  }

}
