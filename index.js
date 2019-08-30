//configuração inicial
const express = require("express");
const server = express();
server.use(express.json());

//projetos
const projects = [];

//routes

//criando novo projeto
server.post("/projects", (req, res) => {
	const { id, title } = req.body;
	projects.push({ id, title, tasks: [] });

	return res.json(projects);
});

//requesição de todos os projetos
server.get("/projects", (req, res) => {
	return res.json(projects);
});

//atualizando titulo de um projeto
server.put("/projects/:id", (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const idx = projects.findIndex(p => p.id == id);
	projects[idx].title = title;
	return res.json(projects);
});

//deletando o projeto
server.delete("/projects/:id", (req, res) => {
	const { id } = req.params;
	const idx = projects.findIndex(p => p.id == id);
	projects.splice(idx, 1);
	return res.json(projects);
});

//criando tarefa em tasks
server.post("/projects/:id/tasks", (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const idx = projects.findIndex(p => p.id == id);
	projects[idx].tasks.push(title);

	return res.json(projects[idx]);
});

server.listen(3000);
