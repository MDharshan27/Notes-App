const addBox = document.querySelector(".add_box");
const popupBox = document.querySelector(".popup_box");
const popupTitle = document.querySelector("header p");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBtn = document.querySelector('button');

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];

// getting localstorage notes if exist and parsing tem
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", ()=>{
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom_content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class='bx bxs-edit-alt'></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class='bx bxs-trash'></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1); //  removing selected note from array/tasks
    //saveing updated notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", e =>{
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        let dataObj = new Date();
        let month = months[dataObj.getMonth()];
        let day = dataObj.getDate();
        let year = dataObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        
        if(!isUpdate){
            notes.push(noteInfo); //adding new notes to note
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; // updateing spacofic note
        }

        //saveing notes to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
    
});
