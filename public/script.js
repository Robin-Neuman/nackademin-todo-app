document.addEventListener("DOMContentLoaded", function () {

    // Open input window
    let newTodoBtn = document.getElementById('newTodo')
    newTodoBtn.addEventListener('click', function () {
        let inputTitle = document.getElementById('inputTitle')
        let submitTodo = document.getElementById('submitTodo')
        inputTitle.classList.remove('hidden')
        submitTodo.classList.remove('hidden')
    })

    // Add new todo on submit
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

    // Delete todo
    let deleteBtns = document.querySelectorAll('.deleteBtn')
    for (button of deleteBtns) {
        button.addEventListener("click", function () {
            fetch(`http://localhost:3006/todo/${this.value}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(window.location.reload())
        })
    }

    // Update "done" field of todo item
    let checkBoxes = document.querySelectorAll('.checkbox')
    for (checkbox of checkBoxes) {
        checkbox.addEventListener('click', function () {
            let title = document.getElementsByClassName('title ' + this.value)[0].innerText
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

    // Edit todo
    let editButtons = document.querySelectorAll('.editBtn')
    for (button of editButtons) {
        button.addEventListener('click', function () {
            let title = document.getElementsByClassName('title ' + this.value)
            let overlay = document.getElementById('overlay')
            let containerModal = document.getElementById('containerModal')
            let modalInput = document.getElementById('modalInput')
            let editedTodo = document.getElementById('editedTodo')
            overlay.classList.remove('hidden')
            containerModal.classList.remove('hidden')
            modalInput.value = title[0].innerText
            editedTodo.value = this.value
        })
    }

    // Cancel editing todo
    let cancelModal = document.getElementById('cancelModal')
    cancelModal.addEventListener('click', function () {
        let overlay = document.getElementById('overlay')
        let containerModal = document.getElementById('containerModal')
        let modalInput = document.getElementById('modalInput')
        let editedTodo = document.getElementById('editedTodo')
        overlay.classList.remove('hidden')
        containerModal.classList.remove('hidden')
        modalInput.value = ""
        editedTodo.value = ""
    })

    // Submit edit
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