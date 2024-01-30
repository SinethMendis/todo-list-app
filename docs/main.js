
document.addEventListener("DOMContentLoaded", function () {

    let addButton = document.querySelector(".add-btn");
    let clearButton = document.querySelector(".clear-btn");
    let removeAllTasksButton = document.querySelector(".remove-all-tasks-btn");
    let taskInput = document.querySelector(".task-input");
    let displaySection = document.querySelector(".tasks-display-section");
    let parentDiv = document.getElementById("display-section-parentDiv");


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

    // Manipulating the display section
    function taskDisplay() {
        let newTask = taskInput.value;

        let removeSelectionButton = document.createElement("button");
        removeSelectionButton.classList.add("remove-Selection-Button");

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

        removeSelectionButton.innerText = "";
        removeSelectionButton.appendChild(removeImage);

        tasksArea.classList.add("child");
        tasksArea.classList.add("tasks-styling");
        tasksArea.appendChild(checkBox);
        tasksArea.appendChild(removeSelectionButton);
        displaySection.appendChild(tasksArea);

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

        clearInput();
    }

    function saveTask(newTask) {
        if (typeof (Storage) !== 'undefined') { // Checking whether the Storage object is defined
            let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieving the tasks array from local storage
            tasks.push(newTask); // Adding the new task to the tasks array (This is stored only in the current session memory)
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Storing the tasks array in the local storage 
        } else {
            alert('Local storage is not supported in your browser');
        }
    }

    function loadTasks() {
        if (typeof (Storage) !== 'undefined') {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Retrieving the tasks array from local storage

            tasks.forEach(function (newTask) { // Doing the same procedure to all the tasks in the array retrieved earlier
                let tasksArea = document.createElement("div");
                tasksArea.textContent = newTask;

                let checkBox = document.createElement("input");
                checkBox.type = 'checkbox';
                checkBox.id = 'newCheckbox';
                checkBox.name = 'newCheckbox';
                checkBox.classList.add("checkBox-styling");

                let removeSelectionButton = document.createElement("button");
                removeSelectionButton.classList.add("remove-Selection-Button");

                let removeImage = document.createElement("img");
                removeImage.src = "images/remove.png";
                removeImage.alt = 'remove-image';
                removeImage.classList.add("remove-image");

                removeSelectionButton.innerText = "";
                removeSelectionButton.appendChild(removeImage);

                tasksArea.classList.add("child");
                tasksArea.classList.add("tasks-styling");
                tasksArea.appendChild(checkBox);
                tasksArea.appendChild(removeSelectionButton);
                displaySection.appendChild(tasksArea);

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
            });
        } else {
            alert('Local storage is not supported in your browser');
        }
    }

    function clearInput() {
        if (taskInput.value === "") {
            alert('Nothing to clear!');
        } else {
            taskInput.value = ""
        }

    }

    function clearDisplay(parent) {
        let childDivs = parent.querySelectorAll(".child");

        childDivs.forEach(function (child) {
            child.remove();
        });

        // Clear localStorage when removing all tasks
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

    // Load tasks when the page loads
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

