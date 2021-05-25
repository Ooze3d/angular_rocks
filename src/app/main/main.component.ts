import { Component, OnInit } from '@angular/core';
import { RockBand } from '../rockband.model';
import { RockBandService } from '../rockband.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  busca:string;
  bandsList: RockBand[] = [];

  constructor(public rockBandService:RockBandService) { }

  ngOnInit(): void {
    this.rockBandService.getRockBandList();
    this.rockBandService.getRockBandListListener().subscribe(list => {
      this.bandsList = list;
    });
  }

  searchBand() {
    this.bandsList = this.rockBandService.rockBandList.filter(x => x.name.toLowerCase().includes(this.busca));
  }

}
