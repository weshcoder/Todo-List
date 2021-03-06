// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")
const searchBar = document.getElementById("searchBar")


//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables

let LIST = []
        , id = 0;


// Show todays date
const options = {weekday : "long", month:"short", day: "numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

function addTodo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =  ` <li class="item">
                        <i class="fa ${DONE} co" job="complete" id ="${id}"></i>
                        <p class="text ${LINE}">${toDo} <i class="fa fa-star-o" style="cursor: pointer; id="favourite"></i> </p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>     
                    </li>
                  `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}




// Search Bar
searchBar.addEventListener('input',filter)
function filter(){
    search = searchBar.value;

    LIST.forEach(function(li) {
        text = li.innerHTML;
        found = text.indexOf(search);

        if(search == ''){
            li.style.display = 'block'
        }else if(search == '' || found == -1) {
            li.style.display = 'none'
        }
        else{
            li.style.display = 'block'
        }
    })
}


// add an item to the list when the user hits the enter key

document.addEventListener("keyup",function(even){
    if (event.keyCode == 13) {
        const toDo = input.value

        // if the input isn't empty
        if(toDo) {
            addTodo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;

}

// target the items created dynamically

list.addEventListener("click", function(event){

        const element = event.target; // return the clicked element inside this list
        const elementJob = element.attributes.job.value; // complete or delete
    
        if(elementJob == "complete") {
            completeToDo(element)
        }else if (elementJob == "delete"){
            removeToDo(element)
        }
}) 