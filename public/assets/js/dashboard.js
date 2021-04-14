document.querySelector('form').addEventListener('submit', async (event)=>{
    event.preventDefault()
    const post_title = document.querySelector('#post-title').value
    const post_text = document.querySelector('#post-text').value
    const response = await fetch('/api/posts', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            post_title,
            post_text
        })
    })
    document.location.reload()
})