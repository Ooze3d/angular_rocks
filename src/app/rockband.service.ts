import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RockBand } from './rockband.model';

@Injectable({ providedIn: 'root' })
export class RockBandService implements OnInit {

    rockBand: RockBand = new RockBand('name', [], 'history', 1970, 'url', []);
    rockBandList: RockBand[] = [];
    private rockBandListener = new Subject<RockBand>();
    private rockBandListListener = new Subject<RockBand[]>();

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        
    }

    getRockBandListener() {
        return this.rockBandListener;
    }

    getRockBandListListener() {
        return this.rockBandListListener;
    }

    newRockBand(band:RockBand) {
        this.rockBandList.push(band);
        this.saveRockBandList();
    }

    deleteRockBand(index:number) {
        this.rockBandList.splice(index, 1);
        this.saveRockBandList();
    }

    getRockBand(index:number) {
        this.rockBand = this.rockBandList[index];
        this.rockBandListener.next(this.rockBand);
    }

    saveRockBandList() {
        this.http.put('https://angularrocks-59f42-default-rtdb.europe-west1.firebasedatabase.app/rockBands.json', this.rockBandList).subscribe((responseData) => { console.log(responseData) });
    }

    getRockBandList() { 
        this.http.get<RockBand[]>('https://angularrocks-59f42-default-rtdb.europe-west1.firebasedatabase.app/rockBands.json').subscribe((list) => { 
            if(list!=undefined) { //In case the list is empty, we stick with the empty array instead of an undefined object
                this.rockBandList = list;
            }
            this.rockBandListListener.next(this.rockBandList);
        });
    }



}