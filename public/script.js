document.addEventListener("DOMContentLoaded", function () {
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    // Open todo input window
    let newTodoBtns = document.querySelectorAll('#listContainer .newTodo')
    for (let i = 0; i < newTodoBtns.length; i++) {
        newTodoBtns[i].addEventListener('click', function () {
            let inputTitle = document.querySelector(`.inputTodo.${newTodoBtns[i].classList[1]}`)
            let submitTodo = document.querySelector(`.submitTodo.${newTodoBtns[i].classList[1]}`)
            inputTitle.classList.remove('hidden')
            submitTodo.classList.remove('hidden')
        })
    }

    // Add new todo on submit
    let submitTodos = document.querySelectorAll(`#listContainer .submitTodo`)
    for (let i = 0; i < submitTodos.length; i++) {
        submitTodos[i].addEventListener('click', function () {
            let inputTitle = document.querySelector(`.inputTodo.${submitTodos[i].classList[1]}`).value
            const decoded = parseJwt(localStorage.getItem('token'))
            let title = {
                title: inputTitle,
                user_id: decoded.user._id
            }
            let id = submitTodos[i].value
            let pureId = id.slice(2)
            fetch(`https://todo-app-robin.herokuapp.com//todo/${pureId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(title)
            })
                .then(window.location.reload())
        })
    }

    // Open list input window
    let newListBtn = document.getElementById('newList')
    newListBtn.addEventListener('click', function () {
        let inputListTitle = document.getElementById('inputListTitle')
        let submitList = document.getElementById('submitList')
        inputListTitle.classList.remove('hidden')
        submitList.classList.remove('hidden')
    })

    // Add new list on submit
    let submitList = document.getElementById('submitList')
    submitList.addEventListener('click', function () {
        const decoded = parseJwt(localStorage.getItem('token'))
        let inputListTitle = document.getElementById('inputListTitle').value
        let title = {
            title: inputListTitle,
            user_id: decoded.user._id
        }
        fetch(`https://todo-app-robin.herokuapp.com/todo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(title)
        })
            .then(window.location.reload())
    })

    // Delete todo
    let deleteBtns = document.querySelectorAll('.deleteBtn')
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener("click", function () {
            let id = deleteBtns[i].value
            let pureId = id.slice(2)
            fetch(`https://todo-app-robin.herokuapp.com/todo/${pureId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(window.location.reload())
        })
    }

    // Delete list
    let deleteListBtns = document.querySelectorAll('.deleteListBtn')
    for (let i = 0; i < deleteListBtns.length; i++) {
        deleteListBtns[i].addEventListener("click", function () {
            let id = deleteListBtns[i].value
            let pureId = id.slice(2)
            fetch(`https://todo-app-robin.herokuapp.com/todo/list/${pureId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(window.location.reload())
        })
    }

    // Update "done" field of todo item
    let checkBoxes = document.querySelectorAll('.checkbox')
    for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('click', function () {
            let title = document.getElementsByClassName('title ' + checkBoxes[i].value)[0].innerText
            let data = {
                done: checkBoxes[i].checked,
                title: title
            }
            let id = checkBoxes[i].value
            let pureId = id.slice(2)
            fetch(`https://todo-app-robin.herokuapp.com/todo/${pureId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data)
            })
        })
    }

    // Edit todo
    let editButtons = document.querySelectorAll('.editBtn')
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function () {
            let title = document.getElementsByClassName('title ' + editButtons[i].value)
            let overlay = document.getElementById('overlay')
            let containerModal = document.getElementById('containerModal')
            let modalInput = document.getElementById('modalInput')
            let editedTodo = document.getElementById('editedTodo')
            overlay.classList.remove('hidden')
            containerModal.classList.remove('hidden')
            modalInput.value = title[0].innerText
            editedTodo.value = editButtons[i].value
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
        let id = submitChange.value
        let pureId = id.slice(2)
        fetch(`https://todo-app-robin.herokuapp.com/todo/${pureId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(window.location.reload())
    })
})