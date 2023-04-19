const formAdd = document.querySelector('#add_user');
const formUpdate = document.querySelector('#update_user');
const URL = '/api/v1/users';

// load users data
document.addEventListener('DOMContentLoaded', printAllUsers);

formAdd?.addEventListener('submit', (e) => {
    e.preventDefault();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const status = document.querySelector('input[name="status"]:checked')?.value;
    const name = formAdd?.name.value;
    const email = formAdd?.email.value;

    if(name === '') return alert('name cannot be empty');
    if(email === '') return alert('email cannot be empty');
    if(!gender) return alert('must select a gender');

    const newUser = {
        name,
        email,
        gender,
        ...(status && { status })
    }

    fetch(URL, {
        method: 'post',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(newUser),
    }).then(() => {window.location.href = '/'})
});
formUpdate?.addEventListener('submit', (e) => {
    e.preventDefault();
   const id = window.location.pathname;

    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const status = document.querySelector('input[name="status"]:checked')?.value;
    const name = document.querySelector('input[name="name"]')?.value;
    const email = document.querySelector('input[name="email"]')?.value;

    if(name === '') return alert('name cannot be empty');
    if(email === '') return alert('email cannot be empty');
    if(!gender) return alert('must select a gender');

    const userUpdated = {
        name,
        email,
        gender,
        ...(status && { status })
    }

    fetch(`${URL}${id}`, {
        method: 'put',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(userUpdated),
    }).then(() => {window.location.href = '/'})
});

function setDeleteFunction() {
    const deleteBtns = document.querySelectorAll('#delete-btn');

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', deleteUser);
    });
}

function deleteUser(e) {
    const id = e.currentTarget.dataset.id;

    const confirmation = confirm('Are you sure you want to delete this user?');

    if(!confirmation) return;

    fetch(`${URL}/${id}`, {
        method: 'delete',
    })
    .then(() => window.location.href = '/');
}

function printAllUsers() {
    const tbody = document.querySelector('tbody');

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(({_id, name, email, gender, status}, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${gender}</td>
                    <td>${status}</td>
                    <td>
                        <a href="/${_id}" class="btn border-shadow update">
                            <span class="text-gradient"><i class="fa-solid fa-pencil"></i></span>
                        </a>
                        <button type="button" class="btn border-shadow delete" id="delete-btn" data-id="${_id}">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </td>
                `;
                
                tbody?.appendChild(tr);
            });
        })
        .then(() => {
            setDeleteFunction()
        }) 
}
