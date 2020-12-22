

export class Skill {
    initial:number
    name:string
    furigana?:string
    job:number
    hobby:number
    other:number
    constructor({name,initial,job,furigana,hobby,other}){
        this.initial = initial | 0
        this.name = name
        this.furigana = furigana
        this.hobby = hobby
        this.other = other
        this.job = job
    }
    get sum(){
        return this.initial + this.job + this.hobby + this.other
    }
    get filter(){
        return this.sum !== this.initial ? this : false
    }
}