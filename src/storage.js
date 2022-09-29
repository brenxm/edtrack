import DateManager from "./datemanager";
import { parse, format } from "date-fns";

export default class Storage{
    static dataStorage = {
        days: [],
        employees: [],
        messages: [],
        notifications: []
    };

    static saveDataToLocalStorage(){
        localStorage.clear();
        for(const dataSet in this.dataStorage){
            localStorage.setItem(dataSet, JSON.stringify(this.dataStorage[dataSet]));
        }
    }

    static localStorageToData(){
        for(const dataSet in this.dataStorage){
            this.dataStorage[dataSet] = JSON.parse(localStorage.getItem(dataSet));
        }
    }

    static initializeStorage(){
    }

    static updateDays(){
        localStorage
    }

    static saveAnnual(){
        const days = DateManager.initialLoad();
        const arr = [];
        days.forEach(day => {
            const obj = {};
            obj[day] = {
                employee: [],
                weekday: false
            };
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
        const arr2 = DateManager.updateAnnualDate();
        const tempArr = [];
        arr2.forEach(arri => {
            const obj = {
                [arri]: {
                    employee: [

                    ],
                    weekend: false
                }
            };
            tempArr.push(obj);
        });
        this.storage.days = JSON.stringify(tempArr);
    };

    static getCurrentDay(){
        const formatDate = format(new Date(), DateManager.dayFormat);
        const parsedDate = JSON.parse(this.storage.days);
        return parsedDate.find(days => days == formatDate);
    }

    static getDate(formattedDy){
        const storage = JSON.parse(this.storage.days);
        let x;
        return {
            day: storage.find(item => {
                    if(Object.keys(item)[0] == formattedDy){
                        x = storage.indexOf(item);
                    }
                    return Object.keys(item)[0] == formattedDy}),
            storageIndex: x
        };
    }

    static indexOfCurrentDate(){
        const days = JSON.parse(this.storage.days);
        return days.indexOf(this.getCurrentDay());
    }

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

    static getParsedStorage(){
        return JSON.parse(this.storage.days);
    }

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
    };

    static newEmployeeSlot(empObj, formattedDay){
        //get parsed storage
        //set new employee obj
        //update parsed storage
        const testObj = {
            name: "Zulma",
            workLoc: "ED",
            workTime: "0646"
        }
        const date = this.getDate(formattedDay);
        const employeeStorage = JSON.parse(this.storage.days)[date.storageIndex][formattedDay].employee;
    }

    //make a separate storage for functional
    //make a function to save Stringied data to storage
  
}


