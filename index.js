// JSON - JavaScript Object Notation

let user = {
    login: "blabla",
    password: {
        salt: {
            sha1: "dksjfiasjor",
            md5: "olkotmdi36plf"
        },
        phrase: "12345"
    }
}

// {
//     "login": "blabla",
//     "password": "blabla"
// }

// {
//      "<key>" : <value>
// }
// <key> - str
// <value> - str, int, bool, null, array, object

let jsonUser = JSON.stringify(user);
console.log(jsonUser);
let userDecode = JSON.parse(jsonUser);
console.log(userDecode.login);
console.log(userDecode["password"]["salt"]["md5"]);
console.log(userDecode.password.phrase)

// AJAX - Async Javascript And Xml
// 1) fetch
// 2) XMLHttpRequest
// ? Promise

const baseApiUrl = 'http://157.230.106.225:8000/api/books';

let book = {
    author: "Erich Maria Remarque",
    title: "Spark of Life"
};

let httpRequest = async function () {
    let response = await fetch(baseApiUrl);
    let result = await response.json();
    for (let i = 0; i < result.length; i++) {
        let div = document.createElement('div');
        div.textContent = result[i].author + ' : ' + result[i].title;
        document.getElementById('content').append(div);
    }

    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(book),
        mode: 'no-cors'
    };
    let responsePost = await fetch(baseApiUrl, option);
    let resultPost = await responsePost.json();
    console.log(resultPost);
};

// let httpRequestPromise = fetch(baseApiUrl);
// httpRequestPromise
//     .then(response => {
//         return response.json();
//     })
//     .then(result => {
//         for (let i = 0; i < result.length; i++) {
//             let div = document.createElement('div');
//             div.textContent = result[i].author + ' : ' + result[i].title;
//             document.getElementById('content').append(div);
//         }
//     })

// let xhr = new XMLHttpRequest();
// xhr.open('GET', baseApiUrl);
// // xhr.open('POST', baseApiUrl)
// xhr.onload = function () {
//     let result = JSON.parse(xhr.responseText);
//     // console.log(result);
//     result = deleteDuplicate(result);
//     result = sort();
//     for (let i = 0; i < result.length; i++) {
//         let div = document.createElement('div');
//         div.textContent = result[i].author + ' : ' + result[i].title;
//         document.getElementById('content').append(div);
//     }
// }
// xhr.onerror = function () {
//     console.log('error');
// }
// xhr.send();
// // xhr.send(JSON.stringify(book));

let xhrPromise = new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', baseApiUrl);
    xhr.onload = function () {
        if (xhr.status !== 200) {
            reject('error');
        }
        resolve(JSON.parse(xhr.responseText));
    }
    xhr.onerror = function () {
        reject('error');
    }
    xhr.send();
});

xhrPromise
    // .then(result => {
    //     return deleteDuplicate(result);
    // })
    // .then(uniqueBooks => {
    //     return sort(uniqueBooks);
    // })
    .then(result => {
            for (let i = 0; i < result.length; i++) {
                let div = document.createElement('div');
                div.textContent = result[i].author + ' : ' + result[i].title;
                document.getElementById('content').append(div);
            }
        },
        error => {
            console.log(error)
        }
    )

// httpRequest();
// UNSENT = 0
// OPENED = 1
// HEADERS_RECEIVED = 2
// LOADING = 3
// DONE = 4
// 0 -> 1 -> 1 -> 2 -> 3 -> 3 -> 3 -> 4
// xhr.onreadystatechange

// Promise
// <pending> -> ok - fulfilled
//              error - rejected

let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        reject("error");
    }, 3000);
    setTimeout(() => {
        resolve("ok 2");
    }, 2000)
});

promise.then(result => {
        console.log(result);
    },
    error => {
        console.log(error)
    }
)