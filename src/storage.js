import DateManager from "./datemanager";
import { parse, format } from "date-fns";

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

    static updateDays(){
        const arr2 = DateManager.initialLoad
        const arr = JSON.stringify(DateManager.initialLoad());
        this.storage.days = arr;
    }

    static getCurrentDay(){
        const formatDate = format(new Date(), DateManager.dayFormat);
        const parsedDate = JSON.parse(this.storage.days);
        return parsedDate.find(days => days == formatDate);
    }

    static indexOfCurrentDate(){
        const days = JSON.parse(this.storage.days);
        return days.indexOf(this.getCurrentDay());
    }

    //get past date/dates using reference date (exclusive)
    //accepting formatted dates arguments only
    static getPastDay(count, referenceDate){
        const days = JSON.parse(this.storage.days);
        const indexOfReferenceDate = days.indexOf(days.find(day => day == referenceDate));
        const arr = [];

        for(let i = indexOfReferenceDate - count; i < indexOfReferenceDate; i++){
            arr.push(days[i]);
        }

        return arr;
    }

    static getFutureDay(count, referenceDate){
        const days = JSON.parse(this.storage.days);
        const indexOfReferenceDate = days.indexOf(days.find(day => day == referenceDate)) + 1;
        const arr = [];

        for (let i = indexOfReferenceDate; i < indexOfReferenceDate + count; i++) {
            arr.push(days[i]);
        }

        return arr;
    };

    static setEmployee(newEmpObj, formattedDay){
        /*
            return
            day: {
                employee: [
                    Zulma: {
                        workLoc: ED,
                        time: 0645 - 1508,
                        specialRed: none
                    }
                ],
                weekend: false
            }
        */

    }
}

