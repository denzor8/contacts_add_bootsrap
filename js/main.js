let imgInp = document.querySelector('#user-url-inp');
let nameInp = document.querySelector('#user-name-inp');
let phoneInp = document.querySelector('#user-phone-inp');
let emailInp = document.querySelector('#user-email-inp');
let addressInp = document.querySelector('#user-address-inp')
let saveChangesBtn = document.querySelector('.save-changes-btn')

function initStorage() {
       if (!localStorage.getItem('users-data')) {
              localStorage.setItem('users-data', '[]');
       };
};
initStorage();

function setContactsToStorage(users) {
       localStorage.setItem('users-data', JSON.stringify(users))
};

function getContactsFromStorage() {
       let users = JSON.parse(localStorage.getItem('users-data'));
       return users;
};

// render
function render(data = getContactsFromStorage()) {
       let container = document.querySelector('.container');
       container.innerHTML = '';
       // let data = getProductsFromStorage();
       data.forEach(item => {
              container.innerHTML += `
              <div class="card w-25 m-2" style="width: 18rem;" id = "${item.id}">
                     <img src="${item.url}" class="card-img-top" alt="error:(" height = "250">
                     <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <hr>
                            <p class="card-text"><b>Phone:</b> ${item.phone}</p>
                            <hr>
                            <p class="card-text"><b>Email:</b> ${item.email}</p>
                            <hr>
                            <p class="card-text"><b>Address:</b> ${item.address}</p>
                            <a href="#" class="btn btn-danger delete-contact-btn">Delete</a>
                            <a href="#" class="btn btn-secodary update-contact-btn"    
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Update</a>
                     </div>
            </div>`;
       });

       if (data.length === 0) return;
       addDeleteEvent();
       addUpdateEvent();
};
render();
// render end

// create
function createContact() {

       let contactObj = {
              id: Date.now(),
              url: imgInp.value,
              name: nameInp.value,
              phone: phoneInp.value,
              email: emailInp.value,
              address: addressInp.value
       };
       // console.log(productObj);
       let users = getContactsFromStorage();
       users.push(contactObj);
       setContactsToStorage(users);

       imgInp.value = '';
       nameInp.value = '';
       phoneInp.value = '';
       emailInp.value = '';
       addressInp.value = '';

       let btnClose = document.querySelector('.btn-close');
       btnClose.click();
       render();
};

let addContactBtn = document.querySelector('.add-contact-btn');
addContactBtn.addEventListener('click', createContact);


// delete 
function deleteContact(e) {
       let contactId = e.target.parentNode.parentNode.id;
       let contacts = getContactsFromStorage();
       contacts = contacts.filter(item => item.id != contactId);
       setContactsToStorage(contacts);
       render()
     };
     
function addDeleteEvent () {
       let delBtns = document.querySelectorAll('.delete-contact-btn');
       // console.log(delBtns);
       delBtns.forEach(item => item.addEventListener('click', deleteContact))
};

// update
function updateContact(e) {
       let contactId = e.target.parentNode.parentNode.id;
       // console.log(productId);
       let contacts = getContactsFromStorage();
       let contactObj = contacts.find(item => item.id == contactId);
       imgInp.value = contactObj.url;
       nameInp.value = contactObj.name;
       phoneInp.value = contactObj.phone;
       emailInp.value = contactObj.email;
       addressInp.value = contactObj.address;

       saveChangesBtn.setAttribute('id', contactId);
};

function addUpdateEvent() {
       let updateBtns = document.querySelectorAll('.update-contact-btn');
       // console.log(updateBtns);
       updateBtns.forEach(item => item.addEventListener('click', updateContact))
};

function saveChanges(e) {
       if (!saveChangesBtn.id) return;
       let contacts = getContactsFromStorage();
       let contactObj = contacts.find(item => item.id == saveChangesBtn.id)
       // console.log(productObj); 
       contactObj.url = imgInp.value;
       contactObj.name = nameInp.value;
       contactObj.phone = phoneInp.value;
       contactObj.email = emailInp.value;
       contactObj.address = addressInp.value;

       setContactsToStorage(contacts);
       saveChangesBtn.removeAttribute('id');

       imgInp.value = '';
       nameInp.value = '';
       phoneInp.value = '';
       emailInp.value = '';
       addressInp.value = '';

       let btnClose = document.querySelector('.btn-close');
       btnClose.click();

       render()
};

saveChangesBtn.addEventListener('click', saveChanges);

// search
let searchInp = document.querySelector('#search-inp');
searchInp.addEventListener('input', e => {
       // console.log(e.target.value);
       let contacts = getContactsFromStorage();
       contacts = contacts.filter(item => {
              return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
       });
       // console.log(products);
       render(contacts);
});