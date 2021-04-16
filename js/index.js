const searchBox = document.querySelector('#search-bar');
const submitButton = document.querySelector('#search-button');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchSearchResults(searchBox.value);
})

function fetchSearchResults(searchValue) {
    return fetch(`https://api.github.com/search/users?q=${searchValue}`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(data => renderSearchResult(data.items));
}

function renderSearchResult(users) {
    users.forEach(user => {
        const userList = document.querySelector('#user-list');
        const div = document.createElement('div');
        div.className = "user-container";
        div.appendChild(getUserName(user));
        div.appendChild(getUserAvatar(user));
        div.appendChild(getLinkToUserProfile(user));
        userList.appendChild(div);
    });    
}

function getUserName(user) {
    const userName = document.createElement('li');
    userName.innerHTML = `Login: <a href="${user.repos_url}" target="_blank">${user.login}</a>`;
    return userName;
}

function getUserAvatar(user) {    
    const userAvatar = document.createElement('img');
    userAvatar.src = user.avatar_url;
    return userAvatar;
}

function getLinkToUserProfile(user) {
    const userProfile = document.createElement('li');
    userProfile.innerHTML = `<a href="${user.html_url}" target="_blank">Profile</a>`;
    return userProfile;
}