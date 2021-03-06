import APIManager from "./APIManager";
import dashboardRefreshional from "./dashboardRefreshional";
import checkObjectError from "./checkObjectError"

const chatEdit = () => {
    const chatDisplay = document.getElementById("chatDisplay")
    chatDisplay.addEventListener("click", function (event) {
        if (event.target.id.split("--")[1] === "edit") {
            const chatId = parseInt(event.target.id.split("--")[2])
            let chatObject = ""
            APIManager.fetchWithoutUserInfo("chats").then(function (chats) {
                chatObject = chats.find(chat => chat.id === chatId)
                chatDisplay.innerHTML = `<div>Edit chat</div><input type="text" id="chatTextEdit" value="${chatObject.text}"></input>
                <button id="chatTextEditSave">Save</button>
                <button id="chats--cancel">Cancel</button>`

                document.getElementById("chatTextEdit").addEventListener("keyup", function (event) {
                    if (event.keyCode === 13) {
                        document.getElementById("chatTextEditSave").click();
                    }
                });

                document.getElementById("chatTextEditSave").addEventListener("click", function (event) {
                    chatObject.text = document.getElementById("chatTextEdit").value
                    const hasError = checkObjectError(chatObject)
                    if (hasError === true) {
                        alert("All fields must be filled!")
                    } else {
                        APIManager.Put("chats", chatId, chatObject).then(dashboardRefreshional)
                    }
                })
            })
        }
    })
}

export default chatEdit