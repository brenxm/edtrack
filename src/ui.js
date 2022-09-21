import Storage from "./storage";
import { parse, format } from "date-fns";
import DateManager from "./datemanager";

export default class Ui{
    hovering = false;
    modalActive = false;
    static initialize(){
        const body = document.querySelector(".content");
        body.innerHTML = `
            <div class="container">
                <div class="header-container"></div>
                <div class="messages-container">
                    <div class="message_header-container">
                        <button>Notification</button>
                        <button>Messages</button>
                    </div>
                    <div class="message_content-container">
                    </div>
                </div>
                <div class="main-content">
                    <div class="schedule-container">
                    </div>
                </div>
            </div>
        `

        const container = document.querySelector(".main-content");
        container.addEventListener("scroll", (e)=>{
            console.log("scrolling");
            console.log(e.target.scrollLeft);

        })
        this.appendModal();

        const columns = document.querySelectorAll(".single-column");
        columns.forEach(ea => ea.addEventListener("mouseenter", (e)=> {
            this.toggleButton(e.target.lastElementChild);
        }), true);


        columns.forEach(ea => {ea.addEventListener("mouseleave", (e)=> {
            this.toggleButton(e.target.lastElementChild);

            if(this.modalActive){
                setTimeout(()=>{
                    if (this.hovering) {
                        console.log("this dude is hovering");
                    } else {
                        this.toggleModal(e);
                    }
                }, 150);
            }
        }), true});
    }

    static generateEmployee(name, time, column){
        const str = `
            <div class="person-container">
                <div class="person-container_name">${name}</div><div class="person-container_time">${time}</div>
            </div>
        `;
        const elem = new DOMParser().parseFromString(str, "text/html");
        
        const employeeContainer = column.children[1];
        employeeContainer.appendChild(elem.documentElement);
    }

    static toggleButton(btnNode){
        if (btnNode.classList == null) return;
        const active = "add-person-btn--active";
        const inactive = "add-person-btn--inactive";
        if (btnNode.classList.value != active && btnNode.classList.value != inactive || btnNode.classList.value == undefined || btnNode.classList.value == false) return;

        btnNode.classList.value == active ? btnNode.classList.value = inactive : btnNode.classList.value = active;
    }

    static appendModal(){
        const dom = document.querySelector(".container");
        const modal = document.createElement("div");
        modal.classList.add("modal-container");
        modal.setAttribute("id", "inactive");
        modal.innerHTML = `
                <div class="modal-hd-container">
                    <span class="modal-hd-date"></span><span class="modal-hd-weekday"></span>
                </div>
                <div class="modal-option-container">
                </div>
        `;
        dom.appendChild(modal);
    }

    static toggleModal(e, date){
        switch(e.target.classList.value){
            case "add-person-btn--active":
                console.log("clicked add button");
                break;
            case "person-container":
                console.log("clicked person container");
                break;
            default:
                console.log("clicked something else");
        }

        const modal = document.querySelector(".modal-container");
        if(modal.id == "active") {
            modal.id = "inactive";
            this.modalActive = false;
            return;
        }

        modal.id = "active";
        document.querySelector(".modal-hd-date").textContent = `${date.month} ${date.day}`;
        document.querySelector(".modal-hd-weekday").textContent = `${date.weekDay}`
        this.modalActive = true;
        modal.addEventListener("mouseenter", ()=>{
            this.hovering = true;
            console.log(this.hovering);
        });
        modal.addEventListener("mouseleave", ()=>{
            modal.id = "inactive";
            this.hovering = false;
            this.modalActive = false;
        })
        const modalWidth = modal.getBoundingClientRect().width;
        const vw = window.innerWidth;
        const elemTransform = e.target.getBoundingClientRect();

        const elementCenterPos = {
            x: elemTransform.x + (elemTransform.width / 2),
            y: elemTransform.y + (elemTransform.height / 2)
        }

        modal.style.top = `${elemTransform.y}px`;
        if(vw - elementCenterPos.x > modalWidth + (modalWidth / 2)){

            modal.style.left = `${vw - (vw-elementCenterPos.x) + (modalWidth / 2)}px`;
            return;
        }

        modal.style.left = `${vw - (vw - elementCenterPos.x) - (modalWidth * 1.5)}px`;
    }
};

const column = (()=>{

    function singleColumn(processedDate){
        const singlePrnt = document.createElement("div");
        singlePrnt.classList.add("single-column");
        singlePrnt.innerHTML = `
            <div class="single_header-container">
                <div class="hd-container-month">${processedDate.month}</div>
                <div class="hd-container-day">${processedDate.day}</div>
                <div class="hd-container-weekday">${processedDate.weekDay}</div>
            </div>
            <div class="sc_employee-container">
            </div>
            <button class="add-person-btn--inactive">+</button>
        `
        singlePrnt.addEventListener("click", (e) => {
            this.toggleModal(e, date);
        }, false)

        return singlePrnt;
    }

    function processDates(date) {
        const parseDate = [];
        date.forEach(day => {
            parseDate.push({
                month: format(parse(day, "MM/dd/yyyy", new Date()), "MMMM"),
                day: format(parse(day, "MM/dd/yyyy", new Date()), "dd"),
                weekDay: format(parse(day, "MM/dd/yyyy", new Date()), "EEEE")
            })
        })

        return parseDate;
    }

    function processDay(formattedDay){
        const rawDate = DateManager.parseDate(formattedDay);
        const obj = {
            month: format(rawDate, "MMMM"),
            day: format(rawDate, "dd"),
            weekDay: format(rawDate, "EEEE")
        };
        return obj;
    }

    function arrayOfColumns(processDates){

        const arr = [];
        processDates.forEach(date =>{
            arr.push(singleColumn(date));
        })

        return arr;
    }
  
    return {
        singleColumn,
        processDates,
        processDay,
        arrayOfColumns
    }
})();

const scheduleContainer = (()=>{
    function initialMount(){
        const container = document.querySelector(".schedule-container");
        const indexOfCurrentDate = Storage.indexOfCurrentDate();

        container.appendChild(column.singleColumn(column.processDay(Storage.getCurrentDay())));

        mountAfterCurrent(column.arrayOfColumns(column.processDates(Storage.getFutureDay(15, Storage.getCurrentDay()))));
    }

    function mountBeforeCurrent(arrayOfColumns){
        const container = document.querySelector(".schedule-container");
        const arr = arrayOfColumns.reverse();

        arr.forEach(item => {
            container.prepend(item);
        })
    }

    function mountAfterCurrent(arrayOfColumns){
        const container = document.querySelector(".schedule-container");
        arrayOfColumns.forEach(item => {
            container.appendChild(item);
        })
    }
    return {
        mountAfterCurrent,
        mountBeforeCurrent,
        initialMount
    }
})();



export { scheduleContainer, column };