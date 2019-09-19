const container = document.getElementById('container');
const input = document.querySelector('.search');
const btn = document.querySelector('#button');
const link = document.querySelector('.card a');


input.addEventListener('input', ()=> container.innerHTML = '');
input.addEventListener('click', ()=> {container.innerHTML = ''; input.value = ''})
input.addEventListener('keyup', (event)=> {
    if(event.keyCode == 13) btn.click();
})

function showUser(user) {
   if (input.value=='') {
       input.value = '';
       container.innerText='INSERT USER';
   }
   else
    fetch(`https://api.github.com/search/users?q=${input.value}&type=Users?page=1&per_page=100&since=1`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.items.length == 0) {
                let noUserDiv = document.createElement('div');
                noUserDiv.setAttribute('class', 'noUserDiv');
                noUserDiv.innerText = 'No users found';
                let noUserImg = document.createElement('img');
                noUserImg.setAttribute('src', 'sadcat.jpg');
                noUserImg.style.width = '10rem';
                noUserImg.style.display = 'block';
                container.appendChild(noUserDiv);
                container.appendChild(noUserImg);
            } else 
                
            
                for (let index = 0; index < data.items.length; index++) {
                    let loginName = [];
                    loginName[index] = data.items[index].login; //gets the name
                    let imgArray =[];
                    imgArray[index]= data.items[index].avatar_url; // gets URL of the image profile
                    let linkArray = [];
                    linkArray[index] = data.items[index].html_url; // gets URL of profile
                    createProfileContainer(loginName[index], linkArray[index], imgArray[index]);
                }
        })
        .catch(error => console.log(error))
}

function createProfileContainer(logName, linkRef, source){
    let newProfileContainer = document.createElement('div');
    newProfileContainer.setAttribute('class', 'profile-container');
    let newContainer= container.appendChild(newProfileContainer);
    newContainer.appendChild(createImg(source));
    newContainer.appendChild(createCard(logName, linkRef));
    return newContainer;
}

function createImg (source) {
    let newImg = document.createElement('img');
    newImg.setAttribute('src', source);
    let imgAppend = container.appendChild(newImg);
    return imgAppend;
}

function createCard(logName, linkRef) {
    let newCard = document.createElement('div');
    newCard.setAttribute('class', 'card');
    let newH4 = document.createElement('h4');
    newH4.innerHTML += logName;
    newCard.appendChild(newH4);
    let newLinkHref = document.createElement('a');
    newLinkHref.innerText = 'View Profile';
    newLinkHref.setAttribute('type', 'button')
    newLinkHref.setAttribute('href', linkRef);
    newCard.appendChild(newLinkHref);
    return newCard;

}

