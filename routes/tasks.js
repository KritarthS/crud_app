const fs = require('fs');

module.exports = {

    addTaskPage: (req, res) => {
        res.render('add-task.ejs', {
            title:" TO-DO List",
            message: ''
        });
    },
    addTask: (req, res) => {
        let message = '';
        let task = req.body.task;
        let deadline = req.body.deadline;
        let importance = req.body.importance;

        let taskQuery = "SELECT * FROM `list` WHERE task = '" + task + "'";

        db.query(taskQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Task already exists';
                res.render('add-task.ejs', {
                    message,
                    title:" TO-DO List"
                });
            } else {
                        
                // send the task's details to the database
                let query = "INSERT INTO `list` (task, deadline, importance) VALUES ('" +
                task + "', '" + deadline + "', '" + importance + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            };
        });
    },
    editTaskPage: (req, res) => {
        let taskID = req.params.id;
        let query = "SELECT * FROM `list` WHERE id = '" + taskID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-task.ejs', {
                title: "Edit Task",
                task: result[0],
                message: ''
            });
        });
    },
    editTask: (req, res) => {
        let taskID = req.params.id;
        let task = req.body.task;
        let deadline = req.body.deadline;
        let importance = req.body.importance;

        let query = "UPDATE `list` SET `task` = '" + task + "', `deadline` = '" + deadline + "', `importance` = '" + importance + "' WHERE `list`.`id` = '" + taskID + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteTask: (req, res) => {
        let taskID = req.params.id;
        let deleteUserQuery = 'DELETE FROM list WHERE id = "' + taskID + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};