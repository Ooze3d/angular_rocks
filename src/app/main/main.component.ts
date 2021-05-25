import { Component, OnInit } from '@angular/core';
import { RockBandService } from '../rockband.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public rockBandService:RockBandService) { }

  ngOnInit(): void {
    this.rockBandService.getRockBandList();
    this.rockBandService.getRockBandListListener().subscribe(list => {
      console.log(list);
    });
  }

}
