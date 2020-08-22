document.addEventListener("DOMContentLoaded", function () {

    let newTodoBtn = document.getElementById('newTodo')
    newTodoBtn.addEventListener('click', function () {
        let inputTitle = document.getElementById('inputTitle')
        let submitTodo = document.getElementById('submitTodo')
        inputTitle.hidden = false
        submitTodo.hidden = false
    })

    let submitTodo = document.getElementById('submitTodo')
    submitTodo.addEventListener('click', function () {
        let inputTitle = document.getElementById('inputTitle').value
        let title = {
            title: inputTitle
        }
        fetch(`http://localhost:3006/todo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(title)
        })
            .then(window.location.reload())
    })

    let deleteBtns = document.querySelectorAll('.deleteBtn')
    for (button of deleteBtns) {
        button.addEventListener("click", function () {
            fetch(`http://localhost:3006/todo/${this.value}`, {
                method: 'DELETE'
            })
                .then(window.location.reload())
        })
    }

    let checkBoxes = document.querySelectorAll('.checkbox')
    for (checkbox of checkBoxes) {
        checkbox.addEventListener('click', function () {
            let title = document.getElementById('title').innerText
            let data = {
                done: this.checked,
                title: title
            }
            fetch(`http://localhost:3006/todo/${this.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        })
    }

    let editButtons = document.querySelectorAll('.editBtn')
    for (button of editButtons) {
        button.addEventListener('click', function () {
            let title = document.getElementsByClassName('title ' + button.value)
            let overlay = document.getElementById('overlay')
            let modal = document.getElementById('modal')
            let modalInput = document.getElementById('modalInput')
            let editedTodo = document.getElementById('editedTodo')
            overlay.hidden = false
            modal.hidden = false
            modalInput.value = title[0].innerText
            editedTodo.value = button.value
        })
    }

    let cancelModal = document.getElementById('cancelModal')
    cancelModal.addEventListener('click', function () {
        let overlay = document.getElementById('overlay')
        let modal = document.getElementById('modal')
        let modalInput = document.getElementById('modalInput')
        let editedTodo = document.getElementById('editedTodo')
        overlay.hidden = true
        modal.hidden = true
        modalInput.value = ""
        editedTodo.value = ""
    })

    let submitChange = document.getElementById('submitChange')
    submitChange.addEventListener('click', function () {
        let modalInput = document.getElementById('modalInput')
        let editedTodo = document.getElementById('editedTodo')
        let done = document.getElementsByClassName('checkbox ' + editedTodo.value)
        let data = {
            done: done[0].checked,
            title: modalInput.value
        }
        fetch(`http://localhost:3006/todo/${editedTodo.value}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(window.location.reload())
    })
})