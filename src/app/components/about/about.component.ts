import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  faAngleDoubleLeft = faAngleDoubleLeft;

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }

}
