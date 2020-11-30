// Apagar aluno 
function eliminar(id) {
    axios.delete("/alunos/" + id)
        .then(response => window.location.assign("/"))
        .catch(err => console.log(err))
}

// Atualizar aluno
function atualizar(id) {
    const newAluno = {
        Número: document.getElementById("Número").value,
        Nome: document.getElementById("Nome").value,
        Git: document.getElementById("Git").value,
    }
    axios.put("/alunos/" + id, newAluno)
        .then(response => window.location.assign("/alunos/" + id))
        .catch(err => console.log(err))
}

// Adicionar tpc
function adicionarTPC(id) {
    axios.put("/alunos/addtpc/" + id)
        .then(response => window.location.assign("/alunos/" + id))
        .catch(err => console.log(err))
}

// Remover tpc
function removerTPC(id) {
    axios.put("/alunos/remtpc/" + id)
        .then(response => window.location.assign("/alunos/" + id))
        .catch(err => console.log(err))
}