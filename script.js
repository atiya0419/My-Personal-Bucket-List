document.addEventListener("DOMContentLoaded", function () {
    loadItems();
});

function addItem() {
    let input = document.getElementById("new-item");
    let itemText = input.value.trim();
    
    if (itemText === "") return;

    let ul = document.getElementById("bucket-list");
    let li = document.createElement("li");
    li.className = "list-item";
    
    // Item text
    let span = document.createElement("span");
    span.textContent = itemText;
    span.className = "item-text";

    // Green check button
    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "✔";
    checkBtn.className = "check-btn";
    checkBtn.onclick = function () {
        span.classList.toggle("completed");  // Strike-through effect
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        ul.removeChild(li);
        saveItems();
    };

    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    input.value = ""; // Clear input
    saveItems();
}

function clearList() {
    document.getElementById("bucket-list").innerHTML = "";
    localStorage.removeItem("bucketList");
}

function saveItems() {
    let items = [];
    document.querySelectorAll(".list-item").forEach(li => {
        items.push({
            text: li.querySelector(".item-text").textContent,
            completed: li.querySelector(".item-text").classList.contains("completed")
        });
    });
    localStorage.setItem("bucketList", JSON.stringify(items));
}

function loadItems() {
    let savedItems = localStorage.getItem("bucketList");
    if (savedItems) {
        let items = JSON.parse(savedItems);
        items.forEach(item => {
            let input = document.getElementById("new-item");
            input.value = item.text;
            addItem();
            if (item.completed) {
                document.querySelectorAll(".item-text").forEach(span => {
                    if (span.textContent === item.text) {
                        span.classList.add("completed");
                    }
                });
            }
        });
    }
}