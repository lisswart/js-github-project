const searchBox = document.querySelector('#search-bar');
const searchDropdown = document.querySelector('#search-bar-dropdown');
const submitButton = document.querySelector('#search-button');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchSearchResults(searchBox.value);
})

function fetchSearchResults(searchValue) {
    if(searchDropdown.value === "user") {
        return fetch(`https://api.github.com/search/users?q=${searchValue}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(resp => resp.json())
        .then(data => renderSearchUserResult(data.items));
    }
    else if(searchDropdown.value === "repos") {
        return fetch(`https://api.github.com/search/repositories?q=${searchValue}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(resp => resp.json())
        .then(data => renderSearchReposResult(data.items));
    }
}

function renderSearchUserResult(users) {
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
    userName.addEventListener("click", event => {
        event.preventDefault();
        fetchUserRepos(user);
    })
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

function fetchUserRepos(user) {
    return fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(resp => resp.json())
        .then(array => renderEntries(array));
}

function renderEntries(array) {
    array.forEach(entry => {
        const reposList = document.querySelector("#repos-list");
        const repoName = document.createElement("li");
        repoName.textContent = entry.full_name;
        reposList.appendChild(repoName);
    })
}

function renderSearchReposResult(repos) {
    repos.forEach(repo => {
        const reposList = document.querySelector("#repos-list");
        const repoName = document.createElement("li");
        repoName.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.html_url}</a>`;
        reposList.appendChild(repoName);
    })
}