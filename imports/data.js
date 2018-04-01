var url = 'https://api.github.com/users/';
var users = ['ravelinx22', 'naguilar12', 'john-guerra', 'fabpot', 'andrew', 'egoist', 'ornicar', 'bebraw', 'nelsonic', 'orta', 'rstacruz', 'afc163', 'bkeepers', 'atmos', 'ai', 'nvie', 'drnic', 'stof', 'phodal', 'ljharb', 'c9s', 'holman', 'dmalan', 'kylef', 'chjj', 'mdo', 'feross', 'matsko', 'curran', 'mattn'];


// async function userInfoPromise(userName) {

//     var userData = {};

//     return await (fetch(url + userName)
//         .then((res) => {
//             return res.json()
//         })
//         .then((json) => {

//             userData.name = json.name;
//             userData.username = json.login;
//             userData.email = json.email;
//             userData.image_url = json.avatar_url;
//             userData.location = json.location;
//             userData.description = json.bio;

//             return json.repos_url;
//         })
//         .then((repos) => {
//             return fetch(repos)
//                 .then((res) => {
//                     return res.json()
//                 })
//                 .then((json) => {
//                     userData.repos = [];
//                     var repos = json;
//                     repos.map((repo) => {
//                         userData.repos.push({
//                             name: repo.name,
//                             description: repo.description,
//                             language: repo.language
//                         });
//                     });
//                 });
//         })
//         .then(() => {
//             userData.languages = [];
//             userData.repos.map((repo) => {
//                 if (!userData.languages.includes(repo.language) && repo.language)
//                     userData.languages.push(repo.language);
//             });
//             return userData;
//         }));
// }

export async function userInfoPromise(userName) {

    var userData = {};

    var res = await fetch(url + userName);
    var json = await res.json();

    userData.name = json.name;
    userData.username = json.login;
    userData.email = json.email;
    userData.image_url = json.avatar_url;
    userData.location = json.location;
    userData.description = json.bio;

    var repos = json.repos_url;

    var res2 = await fetch(repos);
    var json2 = await res2.json();

    userData.repos = [];

    var repositories = json2;
    repositories.map((repo) => {
        userData.repos.push({
            name: repo.name,
            description: repo.description,
            language: repo.language
        });
    })

    userData.languages = [];
    userData.repos.map((repo) => {
        if (!userData.languages.includes(repo.language) && repo.language)
            userData.languages.push(repo.language);
    });

    return userData;
}

export async function usersByLanguage(language) {
    var usersLanguage = [];

    var promises = users.map((user) => {
        userInfoPromise(user)
            .then((userData) => {
                if (userData.languages.includes(language))
                    usersLanguage.push(userData);
            });
    });

    await Promise.all(promises);

    return usersLanguage;
}

export async function allUsersInfo() {
    var allUsers = [];

    var promises = users.map((user) => {
        userInfoPromise(user)
        .then((userData)=>{
            allUsers.push(userData);
        })
    });

    await Promise.all(promises);

    return allUsers;
}