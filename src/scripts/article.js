import APIManager from "./APIManager";
import printToDOM from "./printToDOM";

const articleModule = {
    buildArticleForm: (articleId) => {
        return `<form id="articleForm">
            <input type="hidden" name="articleId" value="${articleId}"></input>
            <fieldset>
                <label for="articleTitle">Article Title:</label><br/>
                <input type="text" name="articleTitle" id="articleTitle"></input>
            </fieldset>
            <fieldset>
                <label for="articleSummary">Article Summary:</label><br/>
                <input type="text" name="articleSummary" id="articleSummary"></input>
            </fieldset>
            <fieldset>
                <label for="articleURL">Article URL:</label><br/>
                <input type="text" name="articleURL" id="articleURL"></input>
            </fieldset>
            <button onsubmit="return false" id="articles--create">Post Your Article</button>
            <button id="articles--cancel">Cancel</button>
        </form>`
    },
    createArticleObject: () => {
        let title = document.querySelector("#articleTitle").value;
        let summary = document.querySelector("#articleSummary").value;
        let url = document.querySelector("#articleURL").value;
        const userId = parseInt(sessionStorage.getItem('userId'))

        const articleObject = {
            title: title,
            summary: summary,
            url: url,
            timestamp: Date.now(),
            userId: userId
        }

        return articleObject

    },
    createArticleHTML: (articleObject, userId, username) => {
        let baseHTML = `<section class="articles" id="article--${articleObject.id}">
        <div class="articleTitle">${articleObject.title}</div>
        <p>${articleObject.summary}</p>
        <p class="articleLink"><a href="http://${articleObject.url}" target="_blank">${articleObject.url}</a></p>
        <p class="articleSubText">by ${username}</p>
        `

        if (articleObject.userId === userId) {
            baseHTML += `
                <button id="articles--edit--${articleObject.id}">Edit</button>
                <button id="articles--delete--${articleObject.id}">Delete</button>
            `
        }

        baseHTML += "</section><hr/>"

        return baseHTML
    },
    articleEdit: () => {
        let database = event.target.id.split("--")[0]
        let articleId = event.target.id.split("--")[2]
        APIManager.getAnyById(database, articleId)
            .then((response) => {
                printToDOM(articleModule.buildArticleForm(), "#formSection")
                let button = document.getElementById("articles--create")
                button.innerText = "Save Edits"
                button.id = `articles--editing--${response.id}`
                document.querySelector("#articleTitle").value = response.title
                document.querySelector("#articleSummary").value = response.summary
                document.querySelector("#articleURL").value = response.url
            })
    }
}
//
export default articleModule