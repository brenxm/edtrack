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


        this.generateColumnCell("September", "4", "Monday")
        this.generateColumnCell("September", "5", "Tuesday")
        this.generateColumnCell("September", "6", "Wednesday")
        this.generateColumnCell("September", "7", "Thursday")
        this.generateColumnCell("September", "8", "Friday")
        this.generateColumnCell("September", "9", "Satruday")
        this.generateColumnCell("September", "10", "Sunday")
        this.generateColumnCell()

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

    static generateColumnCell(month, day, weekDay){
        const date = {month: month, day: day, weekDay: weekDay}
        const singlePrnt = document.createElement("div");
        singlePrnt.classList.add("single-column");
        singlePrnt.innerHTML = `
                <div class="single_header-container">
                    <div class="hd-container-month">${month}</div>
                    <div class="hd-container-day">${day}</div>
                    <div class="hd-container-weekday">${weekDay}</div>
                </div>
            ${this.generateName("Jose", "0630-1508")}
            <button class="add-person-btn--inactive">+</button>
        `
        const p = document.querySelector(".schedule-container");
        p.appendChild(singlePrnt);

        singlePrnt.addEventListener("click", (e)=>{
            this.toggleModal(e, date);
        }, false)
    }

    static generateName(name, time){
        const str = `
            <div class="person-container">
                <div class="person-container_name">${name}</div><div class="person-container_time">${time}</div>
            </div>
        `
        return str;
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
}