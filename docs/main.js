document.addEventListener("DOMContentLoaded", function () {
    let addButton = document.querySelector(".add-btn");
    let clearButton = document.querySelector(".clear-btn");
    let removeAllTasksButton = document.querySelector(".remove-all-tasks-btn");
    let taskInput = document.querySelector(".task-input");
    let displaySection = document.querySelector(".tasks-display-section");
    let parentDiv = document.getElementById("display-section-parentDiv");
    let container = document.querySelector(".container")

    let editingWindow = document.createElement("div");
    editingWindow.classList.add("editingWindow-styling")

    let editingWindowMessage = document.createElement("div");
    editingWindowMessage.classList.add("editingWindowMessage-styling")

    editingWindowMessage.textContent = "Edit your task"
    let editingWindowInput = document.createElement("input");

    editingWindowInput.classList.add("editingWindowInput-styling")
    editingWindowInput.placeholder = "";
    editingWindowInput.style.fontFamily = 'Kanit', "sans-serif";
    editingWindowInput.style.fontSize = "16px";

    let editingWindowOkButton = document.createElement("button");
    editingWindowOkButton.classList.add("editingWindowOkButton-styling")
    editingWindowOkButton.textContent = "OK"

    let editingWindowCloseButton = document.createElement("button");
    editingWindowCloseButton.classList.add("editingWindowCloseButton-styling")
    editingWindowCloseButton.textContent = "x"

    editingWindow.appendChild(editingWindowCloseButton);
    editingWindow.appendChild(editingWindowMessage);
    editingWindow.appendChild(editingWindowInput);
    editingWindow.appendChild(editingWindowOkButton);

    removeAllTasksButton.addEventListener("click", function () {
        if (parentDiv.children.length === 1) {
            alert("Add tasks before removing!");
        } else {
            clearDisplay(parentDiv);
        }
    });
    clearButton.addEventListener("click", function () {
        clearInput();
    });
    addButton.addEventListener("click", function () {
        if (taskInput.value === "") {
            alert("Enter a task to add!");
        } else {
            taskDisplay();
        }
    });
    function setupTaskEventListeners(editingWindow, container, checkBox, tasksArea, removeSelectionButton, editSelectionButton, editingWindowCloseButton, editingWindowOkButton, editingWindowInput) {

        checkBox.addEventListener('change', function () {
            if (checkBox.checked) {
                tasksArea.classList.add("checked-checkbox-styling");
            } else {
                tasksArea.classList.remove("checked-checkbox-styling");
            }
        });
        removeSelectionButton.addEventListener("click", function () {
            tasksArea.remove();
            updateLocalStorage();
        });

        editSelectionButton.addEventListener("click", function () {

            editingWindow.classList.remove("hide-container-2")
            container.classList.add("hide-container")
            document.body.appendChild(editingWindow);
            selectedTask = tasksArea.textContent
            editTask(selectedTask, editingWindowInput);
            function editTask(selectedTask, editingWindowInput) {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                let foundSelectedTask = tasks.find(str => str === selectedTask)
                editingWindowInput.value = foundSelectedTask;
            }
            editingWindowOkButton.addEventListener("click", function () {

                // Get the new task from the input field
                let newEditedTask = editingWindowInput.value.trim();
                console.log(newEditedTask);


                // Check if the new task is empty
                if (newEditedTask === "") {
                    alert("Task cannot be empty. Please enter a valid task.");
                    newEditedTask = selectedTask;
                    location.reload();


                }


                // Check if the new task is the same as the selected task
                if (newEditedTask === selectedTask) {
                    // If the task is not changed, close the editing window
                    container.classList.remove("hide-container");
                    editingWindow.classList.add("hide-container-2");
                    editingWindowInput.value = "";
                    location.reload();



                }

                // Check if the new task already exists in the tasks array
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                // if (tasks.includes(newEditedTask)) {
                //     alert("Task already exists. Please enter a different task.");
                //     location.reload();
                // }

                // Update the tasks array without duplication
                let indexOfSelectedTask = tasks.indexOf(selectedTask);
                if (indexOfSelectedTask !== -1) {
                    tasks[indexOfSelectedTask] = newEditedTask;
                    location.reload();

                }

                // Update local storage with the modified tasks array
                localStorage.setItem('tasks', JSON.stringify(tasks));

                // Update the taskArea content to the new task
                tasksArea.textContent = newEditedTask;

                // Close the editing window
                container.classList.remove("hide-container");
                editingWindow.classList.add("hide-container-2");
                editingWindowInput.value = "";


            });
            editingWindowCloseButton.addEventListener("click", function () {
                container.classList.remove("hide-container")
                editingWindow.classList.add("hide-container-2")
                editingWindowInput.value = "";
            })
        })
    }
    
    function taskDisplay() {
        console.log("TaskDisplay")
        let newTask = taskInput.value;

        let removeSelectionButton = document.createElement("button");
        removeSelectionButton.classList.add("remove-Selection-Button");

        let editSelectionButton = document.createElement("button");
        editSelectionButton.classList.add("edit-Selection-Button");

        saveTask(newTask);

        let tasksArea = document.createElement("div");
        tasksArea.textContent = newTask;

        let checkBox = document.createElement("input");
        checkBox.type = 'checkbox';
        checkBox.id = 'newCheckbox';
        checkBox.name = 'newCheckbox';
        checkBox.classList.add("checkBox-styling");

        let removeImage = document.createElement("img");
        removeImage.src = "images/remove.png";
        removeImage.alt = 'remove-image';
        removeImage.classList.add("remove-image");

        let editImage = document.createElement("img");
        editImage.src = "images/pencil.png";
        editImage.alt = 'edit-image';
        editImage.classList.add("edit-image");

        removeSelectionButton.innerText = "";
        removeSelectionButton.appendChild(removeImage);

        editSelectionButton.innerText = "";
        editSelectionButton.appendChild(editImage);


        tasksArea.classList.add("child");
        tasksArea.classList.add("tasks-styling");
        tasksArea.appendChild(checkBox);
        tasksArea.appendChild(removeSelectionButton);
        tasksArea.appendChild(editSelectionButton);

        displaySection.appendChild(tasksArea);



        setupTaskEventListeners(editingWindow, container, checkBox, tasksArea, removeSelectionButton, editSelectionButton, editingWindowCloseButton, editingWindowOkButton, editingWindowInput)
        clearInput();

    }
    function saveTask(newTask) {
        if (typeof (Storage) !== 'undefined') {                            // Checking whether the Storage object is defined
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];   // Retrieving the tasks array from local storage
            tasks.push(newTask);                                           // Adding the new task to the tasks array (This is stored only in the current session memory)
            localStorage.setItem('tasks', JSON.stringify(tasks));          // Storing the tasks array in the local storage 
        } else {
            alert('Local storage is not supported in your browser');
        }
    }
    function loadTasks() {
        if (typeof (Storage) !== 'undefined') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            tasks.forEach(function (newTask) {
                let tasksArea = document.createElement("div");
                tasksArea.textContent = newTask;

                let checkBox = document.createElement("input");
                checkBox.type = 'checkbox';
                checkBox.id = 'newCheckbox';
                checkBox.name = 'newCheckbox';
                checkBox.classList.add("checkBox-styling");

                let removeSelectionButton = document.createElement("button");
                removeSelectionButton.classList.add("remove-Selection-Button");

                let editSelectionButton = document.createElement("button");
                editSelectionButton.classList.add("edit-Selection-Button");

                let removeImage = document.createElement("img");
                removeImage.src = "images/remove.png";
                removeImage.alt = 'remove-image';
                removeImage.classList.add("remove-image");

                let editImage = document.createElement("img");
                editImage.src = "images/pencil.png";
                editImage.alt = 'edit-image';
                editImage.classList.add("edit-image");

                removeSelectionButton.innerText = "";
                removeSelectionButton.appendChild(removeImage);

                editSelectionButton.innerText = "";
                editSelectionButton.appendChild(editImage);

                tasksArea.classList.add("child");
                tasksArea.classList.add("tasks-styling");
                tasksArea.appendChild(checkBox);
                tasksArea.appendChild(removeSelectionButton);
                tasksArea.appendChild(editSelectionButton);
                displaySection.appendChild(tasksArea);



                setupTaskEventListeners(editingWindow, container, checkBox, tasksArea, removeSelectionButton, editSelectionButton, editingWindowCloseButton, editingWindowOkButton, editingWindowInput)
            });
        } else {
            alert('Local storage is not supported in your browser');
        }
    }
    function clearInput() {
        taskInput.value = "";
    }
    function clearDisplay(parent) {
        let childDivs = parent.querySelectorAll(".child");

        childDivs.forEach(function (child) {
            child.remove();
        });

        localStorage.removeItem('tasks');
    }
    function updateLocalStorage() {
        let tasks = [];
        let childDivs = parentDiv.querySelectorAll(".child");

        childDivs.forEach(function (child) {
            tasks.push(child.textContent);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    window.onload = loadTasks;
});

















// document.addEventListener("DOMContentLoaded", function () {

//     let addButton = document.querySelector(".add-btn");
//     let clearButton = document.querySelector(".clear-btn");
//     let removeAllTasksButton = document.querySelector(".remove-all-tasks-btn")
//     let taskInput = document.querySelector(".task-input");
//     let displaySection = document.querySelector(".tasks-display-section");
//     let parentDiv = document.getElementById("display-section-parentDiv");

//     let tasksArray = [];



//     removeAllTasksButton.addEventListener("click", function () {
//         if (parentDiv.children.length === 1) {
//             alert("Add tasks before removing!");
//         } else {
//             clearDisplay(parentDiv);
//         }
//     });


//     clearButton.addEventListener("click", function () {
//         clearInput();
//     });

//     addButton.addEventListener("click", function () {
//         if (taskInput.value === "") {
//             alert("Enter a task to add!")
//         } else {
//             taskDisplay();
//         }
//     });

//     // Manipulating the display section
//     function taskDisplay() {
//         let newTask = taskInput.value;

//         let removeSelectionButton = document.createElement("button")
//         removeSelectionButton.classList.add("remove-Selection-Button")

//         saveTask(newTask)


//         let tasksArea = document.createElement("div");
//         tasksArea.textContent = newTask;

//         let checkBox = document.createElement("input");
//         checkBox.type = 'checkbox';
//         checkBox.id = 'newCheckbox';
//         checkBox.name = 'newCheckbox';
//         checkBox.classList.add("checkBox-styling");

//         let removeImage = document.createElement("img")
//         removeImage.src = "images/remove.png";
//         removeImage.alt = 'remove-image';
//         removeImage.classList.add("remove-image")

//         removeSelectionButton.innerText = "";
//         removeSelectionButton.appendChild(removeImage)


//         // let toggleContainer = document.createElement("div");
//         // let toggleLabel = document.createElement("label")
//         // let toggleSwitch = document.createElement("div")
//         // let toggleButton = document.createElement("input");
//         // let toggleSlider = document.createElement("div")
//         // toggleLabel.classList.add("toggle-label")
//         // toggleSwitch.classList.add("toggle-switch")

//         // toggleButton.type = "checkbox";
//         // toggleButton.id = "toggleCheckbox";

//         // toggleSlider.classList.add("toggle-slider")

//         // toggleSwitch.appendChild(toggleButton, toggleSlider)

//         // toggleContainer.appendChild(toggleLabel, toggleSwitch)

//         // tasksArea.appendChild(toggleContainer);



//         // let label = document.createElement('label');
//         // label.htmlFor = 'newCheckbox';
//         // label.appendChild(document.createTextNode(''));
//         // tasksArea.appendChild(label);

//         tasksArea.classList.add("child");
//         tasksArea.classList.add("tasks-styling");
//         tasksArea.appendChild(checkBox);
//         tasksArea.appendChild(removeSelectionButton)
//         displaySection.appendChild(tasksArea);

//         checkBox.addEventListener('change', function () {
//             if (checkBox.checked) {
//                 tasksArea.classList.add("checked-checkbox-styling");
//             } else {
//                 tasksArea.classList.remove("checked-checkbox-styling");

//             }
//         });


//         removeSelectionButton.addEventListener("click", function () {
//             tasksArea.remove();
//         });



//         function saveTask(newTask) {
//             if (typeof (Storage) !== 'undefined') {
//                 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//                 tasks.push(newTask);
//                 localStorage.setItem('tasks', JSON.stringify(tasks));
//             } else {
//                 alert('Local storage is not supported in your browser');
//             }
//         }


//         function loadTasks() {

//             if (typeof (Storage) !== 'undefined') {
//                 let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//                 tasks.forEach(function (newTask) {
//                     tasksArea.textContent = newTask;
//                     displaySection.appendChild(tasksArea);
//                 });
//             } else {
//                 alert('Local storage is not supported in your browser');
//             }
//         }




//     }



//     // Clearing the input field
//     function clearInput() {
//         taskInput.value = "";
//     }


//     // Removing all tasks using a loop
//     function clearDisplay(parent) {

//         let childDivs = parent.querySelectorAll(".child")

//         childDivs.forEach(function (child) {
//             child.remove();
//         })
//     }

//     // Load tasks when the page loads
//     window.onload = loadTasks;


// });

