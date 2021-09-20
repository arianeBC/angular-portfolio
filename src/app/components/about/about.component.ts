import { Component, OnInit } from '@angular/core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  faAngleDoubleLeft = faAngleDoubleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
