export class RockBand {

    idband:string;

    constructor(public name:string, public memberList:{name:string, instrument:string}[], public history:string, public year:number, public photoUrl:string, public videos:{title:string, url:string}[]) {

    }

}