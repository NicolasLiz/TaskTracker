#!/usr/bin/env node

const fs = require("fs");

const help_menu = 
`
add task_descritption: adds a new task and create a new task file in current directory if it doesn't exist
delete task_id: delete an existing task
update task_id new_description: updates and existing task
list [task-status]: list all tasks that exist in current directory
mark-in-progress task_id: changes the task status to in-progress
mark-done task_id: changes the task status to done
`

var options = process.argv;
var tasks = [];

function getDate() {
    var currentdate = new Date(); 
    return datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

}

function readTasks() {
    return JSON.parse(fs.readFileSync(".tasks.json"));
}

function writeTasks() {
    fs.writeFileSync(".tasks.json", JSON.stringify(tasks));
}

function addTask(desc) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    }

    const task = {
        "id": tasks.length,
        "description": desc,
        "status": "todo",
        "createdAt": getDate(),
        "updatedAt": getDate()
    };

    tasks[0 + tasks.length] = task;
    writeTasks();
}

function deleteTask(id) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    } else {
        console.error("tasks file does not exist in current directory");
        process.exit(1);
    }
    if (id < 0 || id > tasks.length-1) {
        console.error("index for task out of bounds");
        process.exit(1);
    } else {
        tasks.splice(id, 1);
        if (id < tasks.length) {
            for(let i = id; id < tasks.length; id++) {
                tasks[i].id = id;
            }
        }
        writeTasks();
    }
}

function updateTask(id, desc) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    } else {
        console.error("tasks file does not exist in current directory");
        process.exit(1);
    }
    if (id < 0 || id > tasks.length-1) {
        console.error("index for task out of bounds");
        process.exit(1);
    } else {
        tasks[id].description = desc;
        tasks[id].updatedAt = getDate();
        writeTasks();
    }
}

function listTasks(filter) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    } else {
        console.error("tasks file does not exist in current directory");
        process.exit(1);
    }
    if (filter == "") {
        tasks.forEach(task => {
            console.log(
                "task: " + task.id + "\n" +
                "description: " + task.description + "\n" +
                "status: " + task.status + "\n" + 
                "created at: " + task.createdAt + "\n" +
                "updated at: " + task.updatedAt + "\n"
            );
        })
    } else {
        switch (filter) {
            case "done":
                tasks.forEach(task => {
                    if (task.status == "done") {
                        console.log(
                            "task: " + task.id + "\n" +
                            "description: " + task.description + "\n" +
                            "status: " + task.status + "\n" + 
                            "created at: " + task.createdAt + "\n" +
                            "updated at: " + task.updatedAt + "\n"
                        );
                    }
                })
                break;
            case "todo":
                tasks.forEach(task => {
                    if (task.status == "todo") {
                        console.log(
                            "task: " + task.id + "\n" +
                            "description: " + task.description + "\n" +
                            "status: " + task.status + "\n" + 
                            "created at: " + task.createdAt + "\n" +
                            "updated at: " + task.updatedAt + "\n"
                        );
                    }
                })
                break;
            case "in-progress":
                tasks.forEach(task => {
                    if (task.status == "in-progress") {
                        console.log(
                            "task: " + task.id + "\n" +
                            "description: " + task.description + "\n" +
                            "status: " + task.status + "\n" + 
                            "created at: " + task.createdAt + "\n" +
                            "updated at: " + task.updatedAt + "\n"
                        );
                    }
                })
                break;
            default:
                console.error("invalid filter option")
        }
    }
}

function markInProgress(id) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    } else {
        console.error("tasks file does not exist in current directory");
        process.exit(1)
    }
    if (id < 0 || id > tasks.length-1) {
        console.error("index for task out of bounds");
        process.exit(1)
    } else {
        tasks[id].status = "in-progress";
        writeTasks();
    }
}

function markDone(id) {
    if (fs.existsSync(".tasks.json")) {
        tasks = readTasks();
    } else {
        console.error("tasks file does not exist in current directory");
        process.exit(1)
    }
    if (id < 0 || id > tasks.length-1) {
        console.error("index for task out of bounds");
        process.exit(1)
    } else {
        tasks[id].status = "done";
        writeTasks();
    }
}

if (options.length <= 2) {
    console.log(help_menu);
} else {
    switch (options[2]) {
        case 'add':
            if (options[3]) {
                if (options.length > 4) {
                    console.error("too many arguments");
                } else {
                    addTask(options[3]);
                }
            } else {
                console.error("missing task description");
            }
            break;

        case "delete":
            if (options[3]) {
                if (options.length > 4) {
                    console.error("too many arguments");
                } else {
                    deleteTask(options[3]);
                }
            } else {
                console.error("missing task id");
            }
            break;

        case "update":
            if (options[3]) {
                if (options[4]) {
                    if (options.length > 5) {
                        console.error("too many arguments");
                    } else {
                        updateTask(options[3], options[4]);
                    }
                } else {
                    console.error("missing new task description");
                }
            } else {
                console.error("missing task id");
            }
            break;

        case "list":
            if (options[3]) {
                if (options.length > 4) {
                    console.error("too many arguments");
                } else {
                    listTasks(options[3]);
                }
            } else {
                listTasks("");
            }
            break;

        case "mark-in-progress":
            if (options[3]) {
                if (options.length > 4) {
                    console.error("too many arguments");
                } else {
                    markInProgress(options[3]);
                }
            } else {
                console.error("missing task id");
            }
            break;

        case "mark-done":
            if (options[3]) {
                if (options.length > 4) {
                    console.error("too many arguments");
                } else {
                    markDone(options[3]);
                }
            } else {
                console.error("missing task id");
            }
            break;

        case "help":
            console.log(help_menu);
            break;

        default:
            console.error("unknown command");
            consoel.log(help_menu);
    }

}


