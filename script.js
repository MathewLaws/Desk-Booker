edit_btn = document.getElementById("edit")
elements = document.getElementsByClassName("drag")
let dragged = null
let editing = false

edit_btn.addEventListener("click", () => {
    if (editing) {
        hover(true)
        editing = false
        edit_btn.innerHTML = "Edit"
        Array.from(elements).forEach(element => {
            element.style.cursor = "pointer"
        })
        document.onmousemove = null
        document.onmouseup = null
        dragged = null
        return
    }
    hover(false)
    editing = true
    edit_btn.innerHTML = "Save"
    Array.from(elements).forEach(element => {
        element.style.cursor = "move"
        element.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("sub-table")) {
                dragged = e.target.parentElement
            } else {
                dragged = e.target
            }
            document.onmousemove = drag
            document.onmouseup = closedrag
        })
    })
})

function drag(e) {
    if (!editing) return
    e.preventDefault()
    dragged.style.top = e.y + "px"
    dragged.style.left = e.x + "px"
}

function closedrag() {
    document.onmousemove = null
    document.onmouseup = null
    dragged = null
}

let desks = document.getElementsByClassName("desk")
let form = document.getElementById("form")
let selected = null

function hover(b) {
    if (b) {
        Array.from(desks).forEach(desk => {
            desk.classList.add("hover")
        })
    } else {
        Array.from(desks).forEach(desk => {
            desk.classList.remove("hover")
        })
    }
}

Array.from(desks).forEach(desk => {
    desk.addEventListener("click", (e) => {
        if (selected || editing) return
        hover(false)
        e.target.style.opacity = 1
        e.target.style.background = "blue"
        selected = e.target
        form.style.visibility = "visible"
    })
})

let submit_btn = document.getElementById("submit-btn")

submit_btn.addEventListener("click", () => {
    let details = Array.from(document.querySelectorAll("#form input")).reduce((acc, input) => ({...acc, [input.id]: input.value }), {})
    console.log(details)
})