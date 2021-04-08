const commentForm = document.querySelector('.comment-form')

async function addComment(event){
    event.preventDefault()
    const post_id = event.target.getAttribute('data-id')
    const comment_text = document.querySelector('.comment-form textarea').value.trim()
    const response = await fetch('/api/comments', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({post_id, comment_text})
    })
    document.location.reload()
}

commentForm.addEventListener('submit', addComment)