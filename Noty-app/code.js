const addbox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box");
closeicon = document.querySelector("header i");
updatepopup = document.querySelector("header p");

addbtn = document.querySelector("button");
titletag = document.querySelector("input");
Desctag = document.querySelector("textarea");
const months = ["jan","Feb","Mar","April","May","June","July","Aug",
"Sep","Oct","Nov","Dec"]
//getting local storage notes if exist and parsing them 
//to js object else parsing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isupdate = false,UpdateId;
addbox.addEventListener("click",()=>{
popupBox.classList.add("show");
titletag.focus();
});
closeicon.addEventListener("click",()=>{
    titletag.value = "";
    Desctag.value = "";
    addbtn.innerText="Add Note";
    updatepopup.innerText = "Add a New Note"
    popupBox.classList.remove("show");
    isupdate = false;
    });

    function showNotes() {
        document.querySelectorAll(".note").forEach(note => note.remove());
        notes.forEach((note,index) => {
            let liTag = ` <li class="note">
                        <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="setting">
                            <i  onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                            <li onclick="UpdateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="DeleteNote(${index})"><i  class="uil uil-trash"></i>Delete</li>
                            </ul>
                    </div>
                    </div>
                    </li>`;
                addbox.insertAdjacentHTML("afterend",liTag);
        


        });
    }
    showNotes();
    
    function showMenu(elem){
        elem.parentElement.classList.add("show");
        document.addEventListener("click",e => {
            e.preventDefault();
            if (e.target.tagName != "I" || e.target != elem){
                elem.parentElement.classList.remove("show");
            }
          

        })
    }
    function DeleteNote(NoteId){
        let condelete = confirm("Are You Sure To Delete This Not?!");
        if(!condelete)return;
        notes.splice(NoteId,1); //Remove selected note 
        localStorage.setItem("notes",JSON.stringify(notes));
        location.reload();



    }
    function UpdateNote(NoteId1,NoteTit,NoteDes){
        isupdate = true;
        UpdateId = NoteId1;
        addbox.click();
        addbtn.innerText="Update Note";
        updatepopup.innerText = "Update a Note"
        titletag.value = NoteTit;
        Desctag.value = NoteDes;
   


console.log(NoteId1,NoteTit,NoteDes);
    }
    addbtn.addEventListener("click",e=>{
        let notetitle = titletag.value,
        Desnote = Desctag.value;
        e.preventDefault();
        if (notetitle || Desnote ){
            //get date 
            let dateobj = new Date(),
            month = months[dateobj.getMonth()],
            day = dateobj.getDate(),
            Year = dateobj.getFullYear();

            let noteinfo ={
                title: notetitle, description: Desnote,
                date : `${month} ${day},${Year}`
            }
            if(!isupdate){
                   notes.push(noteinfo); //adding new note to notes
            } else{
                isupdate = false;
                notes[UpdateId] = noteinfo;
            }
               //saving to local storage 
               localStorage.setItem("notes",JSON.stringify(notes));
               //close after adding note : 
               closeicon.click();
                       location.reload();
        }
        });