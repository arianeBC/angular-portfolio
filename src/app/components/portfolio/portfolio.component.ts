import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Project } from 'src/app/services/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  isAuthenticated = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe((projects) => (this.projects = projects));
      
    this.userSubscription = this.authService.user
      .subscribe(user => { this.isAuthenticated = !!user; });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
