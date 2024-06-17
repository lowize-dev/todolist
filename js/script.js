document.addEventListener("DOMContentLoaded", function() {
    
    const key = "TODO_DB_KEY";
    const db_list = JSON.parse(localStorage.getItem(key)) || [];

    const listData = document.getElementById("list-items");
    const inputData = document.getElementById("input-text");
    const addButton = document.getElementById("add-button"); 
    const editButton = document.getElementById("edit-button");
    const deleteAllButton = document.getElementById("delete-all-button");
    const closeButton = document.getElementById("close");
    const modal = document.getElementById("modal");

    document.getElementById("count-data").textContent = db_list.length;

    if (db_list.length > 0) {        
        deleteAllButton.style.display = "block";
    } else {
        deleteAllButton.style.display = "none";
    }

    function PostItem() {
        const inputValue = inputData.value.trim();
        if (inputValue !== "") {
            db_list.push(inputValue);
            InitializeSaveItems(db_list);
        }
    }

    function DeleteItem() {
        document.querySelectorAll("#delete-todo").forEach((button, idx) => {
            button.addEventListener("click", function() {
                db_list.splice(idx, 1);
                InitializeSaveItems(db_list);
            })
        })
    }

    function UpdateItem() {
        document.querySelectorAll("#edit-todo").forEach((button, idx) => {
            button.addEventListener("click", () => {
                
                inputData.value = db_list[idx];
                addButton.style.display = "none";
                editButton.style.display = "block";

                editButton.addEventListener("click", function() {
                    let editedText = inputData.value.trim();

                    if (editedText === "" || /\s/.test(editedText) || null)
                        db_list.splice(idx, 1);
                    else
                        db_list[idx] = editedText;                    

                    InitializeSaveItems(db_list);
                })
            })
        })
    }

    function GetItems(data) {
        let item = "", listItem = "", number=0;
        for (item of data) {
            number++;
            listItem +=
            `
                <li>            
                    <input type="checkbox" id="${number}">
                    <label for="${number}" class="label-text">${item}</label>
                    <div>                        
                        <button type="button" id="edit-todo">&#10148;</button>
                        <button type="button" id="delete-todo">&#9746;</button>
                    </div>
                </li>
            `;
        }
        listData.innerHTML = listItem;
    }

    function InitializeSaveItems(data) {
        localStorage.setItem(key, JSON.stringify(data));
        location.reload();
    }   

    function RenderDate() {
        let dateNow = new Date().toString().split(" ");
        document.getElementById("date-text").textContent = `${dateNow[1]} ${dateNow[2]} ${dateNow[3]}`;
    }
  
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (inputData.value.length >= 42 && !(/\s/.test(inputData.value))) {
            modal.style.display = "block";
            inputData.value = "";
        }
        else PostItem();
    });
   
    inputData.addEventListener("keypress", (e) => {
        e.key === "Enter" ? e.preventDefault() : null;
    });

    deleteAllButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();
        location.reload();
    })

    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "none";
    })

    RenderDate();
    GetItems(db_list);
    UpdateItem();
    DeleteItem();    
})
