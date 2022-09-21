import { format, addDays, subDays, parse } from "date-fns";

export default class DateManager{
    static dayFormat = "MM/dd/yyyy";
    
    static updateAnnualDate(){
        const arr = [...DateManager.fetchPreviousDay(182), format(new Date, this.dayFormat), ...DateManager.fetchNextDay(182)];
        return arr;
    }

    static fetchPreviousDay(count){
        const arr = [];
        for(let i = 1; i <= count; i++){
            arr.unshift(format(subDays(new Date, i), this.dayFormat));
        }
        return arr;
    }

    static fetchNextDay(count){
        const arr = [];
        for(let i = 1; i <= count; i++){
            arr.push(format(addDays(new Date, i), this.dayFormat));
        }
        return arr;
    }

    static formatDate(unformattedDate){

    }
   
    static parseDate(formattedDate){
        return parse(formattedDate, this.dayFormat, new Date());
    }
}
