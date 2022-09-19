import DateManager from "./datemanager";

export default class Storage{
    static storage = localStorage;

    static initializeStorage(){
        this.storage.clear();
        this.storage.setItem("days", "");
        this.storage.setItem("employee", "");
    }

    static saveAnnual(){
        const days = DateManager.initialLoad();
        const arr = [];
        days.forEach(day => {
            const obj = {};
            obj[day] = "new employee here";
            arr.push(obj);
        })
        return arr;
    }

    static getDay(date){
        const days = JSON.parse(this.storage.days);
        cosole.log(days);
        return 
    }

    static getEmployee(){

    }
}

Storage.initializeStorage();
console.log(Storage.saveAnnual());