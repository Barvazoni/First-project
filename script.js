'use strict'

const app = {
    localStorageKey: 'taskJSON'
}

//Elements
const bodyId = document.getElementById("bodyIdName");
const taskDetails = document.getElementById("taskInfo");
const taskEndTime = document.getElementById("taskTime");
const acceptTaskBtn = document.getElementById("taskOk");
const taskBoxesElement = document.getElementById("taskBoxes");
const timeError = document.getElementById("wrongTimeInput");
const taskError = document.getElementById("wrongTaskInput");
const deleteTaskBtn = document.getElementsByClassName("glyphicon-trash");

//RegEx expressions
const dateRegEx = /(([0-2][1-9]|3[0-1]|[1-9]|10|20)[\.\-\/\\](1[0-2]|0[1-9]|[1-9])[\.\-\/\\]((\d\d\d\d)|(\d\d)))|((1[0-2]|0[1-9]|[1-9])[\.\-\/\\]([0-2][1-9]|3[0-1]|[1-9]|10|20)[\.\-\/\\]((\d\d\d\d)|(\d\d)))|(([0-2][0-9]|3[0-1]|[1-9])[\.\-\/\\](1[0-2]|0[1-9]|[1-9]))|((1[0-2]|0[1-9]|[1-9])[\.\-\/\\]([0-2][1-9]|3[0-1]|[1-9]|10|20))|(([0-2][1-9]|3[0-1]|[1-9]|10|20)[\.\-\/\\](1[0-2]|0[1-9]|[1-9]))/;

//Test
var test = 0;

//Event listeners
acceptTaskBtn.addEventListener("click", createTask, true);

//Functions

//bodyId.addEventListener("load", loadTasks());

function loadTasks() {

    for (let i = 1; i++) {
        var taskObject = JSON.parse(localStorage.getItem(app.localStorageKey + i));
        console.log(taskObject);
        
        while(taskObject) {
        var detailsTextnode = document.createTextNode(taskObject.taskDetails);
        var timeTextnode = document.createTextNode(taskObject.taskEndTime);
        
        var taskNode = document.createElement("span");
        var detailsNode = document.createElement("h1");
        var timeNode = document.createElement("p");
        var deleteButton = document.createElement("button");

        taskNode.className = "taskBox";
        taskNode.setAttribute("id", "box" + i);
        deleteButton.className = "glyphicon glyphicon-trash";
        
        detailsNode.appendChild(detailsTextnode);
        timeNode.appendChild(timeTextnode);
        taskNode.appendChild(detailsNode);
        taskNode.appendChild(timeNode);
        taskNode.appendChild(deleteButton);
        taskBoxesElement.appendChild(taskNode);
        }
    }
}

    function createTask() {
        var stopFunc = false;

        //Validate date
        (function valiDate() {
            var i = dateRegEx.test(taskEndTime.value);

            if (i == false) {
                taskEndTime.style.border = 'solid 2px red';
                timeError.innerHTML = "Wrong input";
                stopFunc = true;
            }
        }());

        //Validate text
        (function valiText() {
            var i = taskDetails.value;

            if (i == "" || i.length < 3) {
                taskDetails.style.border = 'solid 2px red';
                taskError.innerHTML = "Input empty or to short";
                stopFunc = true;
            }
        }());



        (function addTask() {

            (function taskNum() {
                var i = 0;
                while (i <= test) {
                    i++;
                }
                test = i;
            }());

            if (stopFunc == false) {
                var detailsTextnode = document.createTextNode(taskDetails.value);
                var timeTextnode = document.createTextNode(taskEndTime.value);

                let taskObject = {
                taskDetails: taskDetails.value,
                taskEndTime: taskEndTime.value,
                test: test
                }
                var taskNode = document.createElement("span");
                var detailsNode = document.createElement("h1");
                var timeNode = document.createElement("p");
                var deleteButton = document.createElement("button");

                taskNode.className = "taskBox";
                taskNode.setAttribute("id", "box" + test);
                deleteButton.className = "glyphicon glyphicon-trash";



                detailsNode.appendChild(detailsTextnode);
                timeNode.appendChild(timeTextnode);
                taskNode.appendChild(detailsNode);
                taskNode.appendChild(timeNode);
                taskNode.appendChild(deleteButton);
                taskBoxesElement.appendChild(taskNode);

                taskEndTime.style.border = 'none';
                timeError.innerHTML = "";
                taskDetails.style.border = 'none';
                taskError.innerHTML = "";
                
                let myJson = JSON.stringify(taskObject);
                console.log("1" + myJson);
                localStorage.setItem(app.localStorageKey + test, myJson);
            }
        }());
    };



    function deleteTask() {

        timeError.removeChild(timeError.childNodes[0]);
    }
