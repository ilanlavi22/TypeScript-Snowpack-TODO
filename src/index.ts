import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// Selectors ///////////////////////////////////////////

// querySelector example
const listContainer = document.querySelector<HTMLUListElement>('#list');
// element by id example
const todoInput = document.getElementById('new-task-title') as HTMLInputElement;
const form = document.getElementById('new-task-form') as HTMLFormElement | null;

//creating tasks array
const tasks: Task[] = loadTasks();
tasks.forEach(createList);

// Event Listeners  ///////////////////////////////////////////

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (todoInput?.value == '' || todoInput.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: todoInput.value,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  saveTasks();

  createList(newTask);
  todoInput.value = '';
});

// Functions  ///////////////////////////////////////////

function createList(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.setAttribute('id', `${task.id}`);
  item.append(label);
  listContainer?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
