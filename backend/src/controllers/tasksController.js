const tasksModel = require('../models/tasksModel')

const getAll = async (request, response) => {

    const tasks = await tasksModel.getAll();

    return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
    const { title } = request.body;
    const createdTask = await tasksModel.createTask({ title });
    return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
    const { id } = request.params;
    await tasksModel.deleteTask(id);
    return response.status(204).json();
};

const updateTask = async (request, response) => {
    const { id } = request.params;
    const { title, status } = request.body;
    const updatedTask = await tasksModel.updateTask(id, { title, status });
    return response.status(200).json(updatedTask);
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};