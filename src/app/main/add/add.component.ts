import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RockBand } from 'src/app/rockband.model';
import { RockBandService } from 'src/app/rockband.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, AfterViewInit {

  title:string;
  videoUrl:string;
  videoError:string = '';

  memberName:string;
  instrument:string;
  memberError:string = '';

  bandAdded:boolean = false;
  nameAdded:string = '';
  errorDup:boolean = false;

  addVid:boolean = false;
  url:string = '';
  memberList:{name:string, instrument:string}[] = [];
  videoList:{title:string, url:string}[] = [];

  constructor(public rockBandService:RockBandService) { }

  ngOnInit(): void {
    this.rockBandService.getRockBandList();
    
  }

  ngAfterViewInit():void {
    console.log(this.rockBandService.rockBandList);
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

    this.memberList.push({name: this.memberName, instrument: this.instrument});
    this.memberName = '';
    this.instrument = '';
    this.memberError = '';
  }

  deleteMember(id:number) {
    this.memberList.splice(id, 1);
  }

  addVideo() {
    if(this.title.trim()=='' || this.videoUrl.trim()=='' || this.title==undefined || this.videoUrl==undefined) {
      this.videoError = 'Los campos no pueden estar vacíos';
      return;
    } else if(this.checkVideo()) {
      this.videoError = this.title+' ya está incluído';
      return;
    }

    this.videoList.push({title: this.title, url: this.videoUrl});
    this.title = '';
    this.videoUrl = '';
    this.videoError = '';
  }

  deleteVideo(id:number) {
    this.videoList.splice(id, 1);
  }

  onNewBand(f:NgForm) {
    this.bandAdded = false;
    if(!f.valid)
      return;

    if(f.value.url=='')
      this.url = 'http://www.sinproblema.net/img/rockband.png';
    else
      this.url = f.value.url;
    
    let idband:string = String(f.value.name).replace(' ','').trim().toLowerCase().substr(0,4)+Math.round(Math.random()*899+100);
    let newBand:RockBand = new RockBand(f.value.name, this.memberList, f.value.history, f.value.year, this.url, this.videoList);
    newBand.idband = idband;
    
    if(!this.rockBandService.rockBandList.some(e => e.name == f.value.name)) {
      this.rockBandService.newRockBand(newBand);
      this.nameAdded = f.value.name;
      f.resetForm();
      this.memberList = [];
      this.videoList = [];
      this.bandAdded = true;
    } else if(!this.bandAdded) {
      this.nameAdded = f.value.name;
      this.errorDup = true;
    }
  }

  checkMember():boolean {
    return this.memberList.some(e => e.name == this.memberName);
  }

  checkVideo():boolean {
    return this.videoList.some(e => e.title == this.title);
  }

  switchVideos() { //No se por qué el ternario no funciona bien
    if(this.addVid)
      this.addVid = false;
    else
      this.addVid = true;
  }

}
