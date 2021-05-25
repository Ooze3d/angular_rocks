import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RockBand } from 'src/app/rockband.model';
import { RockBandService } from 'src/app/rockband.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  idband:string;

  title:string;
  videoUrl:string;
  videoError:string = '';

  memberName:string;
  instrument:string;
  memberError:string = '';

  bandEdited:boolean = false;
  nameEdited:string = '';
  errorDup:boolean = false;

  addVid:boolean = false;
  url:string = '';

  editBandForm = new FormGroup({ //Necesario para la actualización dinámica del formulario
    name: new FormControl(''),
    history: new FormControl(''),
    year: new FormControl(''),
    url: new FormControl('')
  });

  constructor(public rockBandService:RockBandService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idband = params['idband'];
    });
    this.rockBandService.getRockBand(this.idband);
    this.rockBandService.getRockBandListener().subscribe(band => {
      console.log(band.name+' cargada!');
    });
    this.editBandForm.setValue({
      name: this.rockBandService.rockBand.name,
      history: this.rockBandService.rockBand.history,
      year: this.rockBandService.rockBand.year,
      url: this.rockBandService.rockBand.photoUrl
    });
    if(this.rockBandService.rockBand.memberList==undefined)
      this.rockBandService.rockBand.memberList = [];
    if(this.rockBandService.rockBand.videos==undefined)
      this.rockBandService.rockBand.videos = [];
  }

  ngAfterViewInit():void {
    
  }

  addMember() {
    if(this.memberName.trim()=='' || this.instrument.trim()=='' || this.memberName==undefined || this.instrument==undefined) {
      this.memberError = 'Los campos no pueden estar vacíos';
      console.log(this.memberError);
      return;
    } else if(this.checkMember()) {
      this.memberError = this.memberName+' ya está incluído';
      console.log(this.memberError);
      return;
    }

    this.rockBandService.rockBand.memberList.push({name: this.memberName, instrument: this.instrument});
    this.memberName = '';
    this.instrument = '';
    this.memberError = '';
  }

  deleteMember(id:number) {
    this.rockBandService.rockBand.memberList.splice(id, 1);
  }

  addVideo() {
    if(this.title.trim()=='' || this.videoUrl.trim()=='' || this.title==undefined || this.videoUrl==undefined) {
      this.videoError = 'Los campos no pueden estar vacíos';
      return;
    } else if(this.checkVideo()) {
      this.videoError = this.title+' ya está incluído';
      return;
    }

    this.rockBandService.rockBand.videos.push({title: this.title, url: this.videoUrl});
    this.title = '';
    this.videoUrl = '';
    this.videoError = '';
  }

  deleteVideo(id:number) {
    this.rockBandService.rockBand.videos.splice(id, 1);
  }

  onBandUpdate() {
    this.bandEdited = false;

    if(this.editBandForm.value.url=='')
      this.url = 'http://www.sinproblema.net/img/rockband.png';
    else
      this.url = this.editBandForm.value.url;
    
    let newBand:RockBand = new RockBand(this.editBandForm.value.name, this.rockBandService.rockBand.memberList, this.editBandForm.value.history, this.editBandForm.value.year, this.url, this.rockBandService.rockBand.videos);
    newBand.idband = this.rockBandService.rockBand.idband;
    
    this.rockBandService.editRockBand(newBand);
    this.nameEdited = this.editBandForm.value.name;
    this.bandEdited = true;
    
  }

  checkMember():boolean {
    return this.rockBandService.rockBand.memberList.some(e => e.name == this.memberName);
  }

  checkVideo():boolean {
    return this.rockBandService.rockBand.videos.some(e => e.title == this.title);
  }

  switchVideos() { //No se por qué el ternario no funciona bien
    if(this.addVid)
      this.addVid = false;
    else
      this.addVid = true;
  }

}
