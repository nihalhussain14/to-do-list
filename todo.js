let btn = document.querySelector("#addtask");
let newTaskInput = document.querySelector("#wrapp input");
let taskContainer = document.querySelector("#task");
let error = document.querySelector("#error");
let countValue = document.querySelector(".countvalue");

let taskCount = 0;
const dispalyTask = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.dispaly = "none";
    if(!taskName){
        setTimeout(() => {
            error.style.dispaly = "block";
        },200);
        return;
    }
    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button style=" background-color: #ff5c5c;" class="delete>
    <i class="fa-regular fa-trash-can"></i>
    </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);

    const deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            taskCount +=1;
            dispalyTask(taskCount);
        }
    });

    const editbutton = document.querySelectorAll(".edit");
    editbutton.forEach((editbtn) => {
        editbtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= -1;
            dispalyTask(taskCount);
        };
    });
    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount -= 1;
            }
            else{
                taskCount += 1;
            }
            dispalyTask(taskCount);
        };
    });
    taskCount += 1;
    dispalyTask(taskCount);
    newTaskInput.value = "";
};
btn.addEventListener("click", addTask)

window.onload = () => {
    taskCount = 0;
    dispalyTask(taskCount);
    newTaskInput.value = "";
}
