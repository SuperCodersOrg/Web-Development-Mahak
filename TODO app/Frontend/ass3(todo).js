let icon1 = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"></path></svg>`;
let icon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-sparkles-icon lucide-pencil-sparkles"><path d="M10 3H8"/><path d="m15.007 5.008 3.987 3.986"/><path d="M20 15v4"/><path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M22 17h-4"/><path d="M4 5v4"/><path d="M6 7H2"/><path d="M9 2v2"/></svg>`;
let iconTrash = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

let mainFrame = document.getElementById("main-frame");
mainFrame.className = "max-w-3xl mx-auto mt-10 p-8 rounded-lg bg-gray-100 border border-gray-300";

let heading = document.getElementById("heading");
heading.innerHTML = '<h1 class="text-5xl font-bold text-center text-black mb-6">To Do App</h1>';

let inputBox = document.getElementById("input-box");
inputBox.className = "flex flex-col gap-4 mb-6";

let outputBox = document.getElementById("output-box");
outputBox.className = "flex flex-col";

let url = 'http://localhost:3000';

inputBox.innerHTML = `
  <input id="title-box" placeholder="Enter Title"
         class="h-12 w-full bg-white text-black text-xl p-3 rounded border border-gray-400" >
  <textarea id="des" placeholder="Enter Description"
            class="h-20 w-full bg-white text-black text-xl p-3 rounded border border-gray-400 resize-none"></textarea>
  <button onclick="addTask()" 
          class="bg-blue-500 hover:bg-blue-600 text-white text-xl py-2 rounded">
    Add Task
  </button>
`;

let tasks = [];
let editingTaskId = null;

function showTask(title, desc, id, dateString, deleted, completed) {
  let outputBox = document.getElementById("output-box");
  let card = document.createElement("div");

  card.className = "p-4 rounded border border-gray-400 bg-white mb-4";

  if (completed) {
    card.classList.add("bg-green-100");
  }

  card.id = id;

  card.innerHTML = `
    <h2 class="text-2xl font-bold text-black mb-2">${title}</h2>
    <h3 class="text-lg text-gray-700 mb-1">${desc}</h3>
    <p class="text-sm text-gray-500 mb-3">${dateString}</p>

    <div class="flex gap-3">

      <button onclick="deleteTask(${id})" 
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
        ${iconTrash}
      </button>

      <button onclick="completeTask(${id})" type="button"
              class="${completed ? "bg-gray-500" : "bg-green-500"} text-white px-3 py-1 rounded">
        ${icon1}
      </button>

      <button onclick="editTask(${id})" type="button"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded">
        ${icon2}
      </button>

    </div>
  `;

  outputBox.appendChild(card);
}

function completeTask(id) {

  fetch(`${url}/completed/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    }
  })

    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      return res.json();

    })
    .then((update) => {
      console.log(update);
      let task = tasks.find((t) => {
        console.log(update.id);
        return t.id === update.id;
      })
      if (task) {
        task.completed = update.completed;
      }

      let card = document.getElementById(id);
      let doneButton = card.querySelector("button:nth-child(2)");

      if (update.completed) {
        card.classList.add("bg-green-100");

        doneButton.classList.remove("bg-green-500");
        doneButton.classList.add("bg-gray-500");
      }
      else {
        card.classList.remove("bg-green-100");

        doneButton.classList.remove("bg-gray-500");
        doneButton.classList.add("bg-green-500");
      }
    })
}

function editTask(id) {
  let task = tasks.find(t => t.id === id);
  document.getElementById("title-box").value = task.title;
  document.getElementById("des").value = task.desc;
  editingTaskId = id;
}

function deleteTask(id) {

  fetch(`${url}/deletetask/${id}`, {
    method: 'delete',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok) {
        console.log(id);
      } else {
        console.error('failed to delete:', res.statusText);
      }
    })

  loadtask();
}

function loadtask() {
  fetch(`${url}/loadtask`)
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      tasks = result;

      result.forEach((finaldata) => {
        if (!finaldata.isdeleted) {
          showTask(
            finaldata.title,
            finaldata.desc,
            finaldata.id,
            finaldata.dateString,
            finaldata.isdeleted,
            finaldata.completed
          )
        };
      });
    });
}

function addTask() {

  let title = document.getElementById("title-box").value.trim();
  let desc = document.getElementById("des").value.trim();

  if (!title || !desc) {
    Swal.fire({
      title: "Warning",
      text: "Please enter title and description",
      icon: "warning",
    });
    return;
  }

  // let task = tasks.find(t => t.id === editingTaskId);
  if (editingTaskId !== null) {
    fetch(`${url}/updatetask/${editingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        desc: desc
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((updatedTask) => {
        let task = tasks.find((t) => {
          return t.id === updatedTask.id;
        });
        if (task) {
          task.title = updatedTask.title;
          task.desc = updatedTask.desc;
        }

        let card = document.getElementById(updatedTask.id);
        card.querySelector("h2").innerText = updatedTask.title;
        card.querySelector("h3").innerText = updatedTask.desc;

        editingTaskId = null;

        document.getElementById("title-box").value = "";
        document.getElementById("des").value = "";
      });
    return;
  }

  let finaldata = {
    id: new Date().getTime(),
    title: title,
    desc: desc,
    dateString: new Date().toLocaleString(),
    isdeleted: false,
    completed: false
  };

  fetch(`${url}/addtask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(finaldata)
  })

    .then((res) => {
      return res.json();
    })
    .then((elem) => {

      showTask(
        elem.title,
        elem.desc,
        elem.id,
        elem.dateString,
        elem.completed
      );
      document.getElementById("title-box").value = "";
      document.getElementById("des").value = "";
    })

}

loadtask();