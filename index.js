const cohort = "2109-CPU-RM-WEB-PT";
const baseURL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + cohort; //



async function getEvents() {
    try{
        const response = await fetch(`${baseURL}/events`)
        const returnObject = await response.json();
        console.log(returnObject.data);
        events = returnObject.data;
        return events
    } catch(error) {
    console.log(error);
    };
};
const testDate= "2021-09-30T00:00:00.000Z"

const display = async(events) => {
    const flyers= document.getElementById("events");
    // console.log(events)
    // flyers.innerHTML= "";
    const form= document.querySelector("form")
    form.addEventListener("submit" , async(event) => {
        event.preventDefault()
        createEvent(form.name.value, testDate, form.description.value, form.location.value)
        await getEvents()
        fetchAndDisplay()
    });
    const eventElements= await Promise.all(

     events.map(async (event) =>{
        const eventDiv= document.createElement("div");
        const eventName= document.createElement("h3");
        const eventDate= document.createElement("p");
        const eventDescription= document.createElement("p");
        const eventLocation= document.createElement("h5");
        const deleteButton= document.createElement("button");


        eventName.textContent= event.name;
        eventDate.textContent= event.date;
        eventDescription.textContent= event.description;
        eventLocation.textContent= event.location;
        deleteButton.textContent= "Delete"

        deleteButton.addEventListener("click" , async() => {
            await deleteParty(event.id)
            await getEvents()
            fetchAndDisplay()
        });
        
        eventDiv.appendChild(eventName);
        eventDiv.appendChild(eventDate);
        eventDiv.appendChild(eventDescription);
        eventDiv.appendChild(eventLocation);
        eventDiv.appendChild(deleteButton);
        
        return eventDiv
        
    })
);
    flyers.append(...eventElements);

}
const fetchAndDisplay = async () => {
    const events= await getEvents();
if(events){
    display(events);
}
}
fetchAndDisplay();



async function createEvent(name, date, description, location) {
    console.log(date)
    try{
        const response = await fetch(`${baseURL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                name,
                description,
                date,
                location,
            })
        });
const data= await response.json();
// console.log(data)
// console.log(name)
// console.log(location)

if (data.error){
    throw new Error(data.message) 
}
render();
    } catch(error){
        console.error(error);
    }
}
const deleteParty = async(id) =>{
   try {
    const response = await fetch(`${baseURL}/events/${id}`, {
        method: "DELETE"});
   } catch (error) {
    console.error(error)
   }
};

