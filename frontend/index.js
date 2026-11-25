const tbody = document.querySelector('tbody');

const addForm = document.querySelector('.add-form');

const inputTask = document.querySelector('#input-task');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task),
    })

    loadTasks();
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'DELETE',
    });
    loadTasks();
}

const updateTask = async (id, title, status) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, status }),
    });
    loadTasks();
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if (innerText){
        element.innerText = innerText;
    }
    
    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    
    return element;
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluida">Concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;
    select.dataset.status = value;

    return select;
}

const createRow = (task) => {

    const { id, title, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    select.addEventListener('change', ({target}) => updateTask(id, title, target.value));
    
    const editButton = createElement('button');
    editButton.classList.add('btn-action', 'edit');
    editButton.innerHTML = '<img src="images/edit.png" alt="editar" width="30px">';
    

    const deleteButton = createElement('button');
    deleteButton.classList.add('btn-action', 'delete');
    deleteButton.innerHTML = '<img src="images/delete.png" alt="excluir" width="30px">';

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask(id, editInput.value, status);
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerHTML = '';
        editInput.value = title;
        tdTitle.appendChild(editForm);
    });

    deleteButton.addEventListener('click', () => deleteTask(id));
    

    tr.appendChild(tdTitle);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    tdStatus.appendChild(select);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    
    return tr;
};

const loadTasks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';

    if (tasks.length === 0) {
        const tr = createElement('tr');
        const td = createElement('td', 'Nenhuma tarefa por aqui. Que tal criar uma?');

        td.colSpan = 3;
        td.classList.add('empty-message');

        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();