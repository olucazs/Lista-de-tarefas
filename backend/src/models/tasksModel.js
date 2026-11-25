const connection = require('./connection');

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks');
    return tasks[0];
};

const createTask = async (task) => {
    const { title } = task;

    const createdTask = await connection.execute('INSERT INTO tasks (title, status) VALUES (?, ?)', [title, 'pendente']);
    return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const [updatedTask] = await connection.execute('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [task.title, task.status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};


