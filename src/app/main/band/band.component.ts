import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RockBandService } from 'src/app/rockband.service';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.css']
})
export class BandComponent implements OnInit {

  idband:string;

  constructor(public rockBandService:RockBandService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => { //Extraemos el DNI de la url
      this.idband = params['idband'];
    });
    this.rockBandService.getRockBand(this.idband);
  }

}
