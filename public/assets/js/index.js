const login = document.querySelectorAll('.login')
async function loginPage(event){
    event.preventDefault()
    const response = await fetch('/login', {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({username: 'jwilloughway1', user_id:1})
    })
    document.location.reload()
}

login.forEach(el => {
    el.addEventListener('click', loginPage)
})

const logout = document.querySelectorAll('.logout')
async function logoutPage(event){
    event.preventDefault()
    const response = await fetch('/logout', {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT'
    })
    document.location.reload()
}

logout.forEach(el => {
    el.addEventListener('click', logoutPage)
})

const like = document.querySelectorAll('.like')

async function likeComment(event){
    event.preventDefault()
    const comment_id = event.target.getAttribute('data-id')
    const response = await fetch('/api/comments/like', {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({comment_id})
    })
    document.location.reload()
}

like.forEach(el => {
    el.addEventListener('click', likeComment)
})

const favorite = document.querySelectorAll('.favorite')

async function favoritePost(event){
    event.preventDefault()
    const post_id = event.target.getAttribute('data-id')
    const response = await fetch('/api/posts/favorite', {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({post_id})
    })
    document.location.reload()
}

favorite.forEach(el => {
    el.addEventListener('click', favoritePost)
})

