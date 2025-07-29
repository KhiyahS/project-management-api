const express = require('express');
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const authMiddleware = require('../../utils/auth');
const router = express.Router();

// Create a new task for a specific project (POST /api/projects/:projectId/tasks)
router.post('/:projectId/tasks', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;
  
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const newTask = new Task({
      title,
      description,
      status,
      project: project.id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get all tasks for a specific project (GET /api/projects/:projectId/tasks)
router.get('/:projectId/tasks', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const tasks = await Task.find({ project: project.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update a task (PUT /api/tasks/:taskId)
router.put('/:taskId', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = await Project.findById(task.project);
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Delete a task (DELETE /api/tasks/:taskId)
router.delete('/:taskId', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = await Project.findById(task.project);
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
