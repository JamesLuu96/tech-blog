const commentForm = document.querySelector('.comment-form')
const pageEl = document.querySelector('.my_user')
const pageId = document.querySelector('.favorite').getAttribute('data-id')

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

if(pageEl){
    pageEl.addEventListener('click', async (event)=>{
        event.preventDefault()
        if(event.target.className.includes('edit-post')){
            const postTitleEl = document.querySelector('.title')
            const postTextEl = document.querySelector('.post-body')
            const editPostEl = document.querySelector('.edit-post')
            postTitle = postTitleEl.textContent
            postText = postTextEl.textContent
            const postTitleArea = document.createElement('textarea')
            postTitleArea.setAttribute('placeholder', 'Post Title')
            postTitleArea.setAttribute('class', 'form-control')
            postTitleArea.setAttribute('id', 'post-edit-title')
            postTitleArea.setAttribute('onInput', `this.setCustomValidity('')`)
            postTitleArea.textContent = postTitle
            const postTextArea = document.createElement('textarea')
            postTextArea.setAttribute('placeholder', 'Post Body Text')
            postTextArea.setAttribute('class', 'form-control')
            postTextArea.setAttribute('id', 'post-edit-text')
            postTextArea.setAttribute('onInput', `this.setCustomValidity('')`)
            postTextArea.textContent = postText
            postTitleEl.replaceWith(postTitleArea)
            postTextEl.replaceWith(postTextArea)
            const saveButtonEl = document.createElement('button')
            saveButtonEl.setAttribute('class', 'save-post btn btn-primary')
            saveButtonEl.textContent = 'Save Post'
            editPostEl.replaceWith(saveButtonEl)
        } else if(event.target.className.includes('delete-post')){
            const deleteButton = document.querySelector('.delete-post')
            const confirmDelete = document.createElement('button')
            confirmDelete.textContent = "Confirm Delete?"
            confirmDelete.setAttribute('id', 'confirm-delete-post')
            confirmDelete.setAttribute('class', 'btn btn-danger')
            deleteButton.replaceWith(confirmDelete)
        } else if(event.target.className.includes('save-post')){
            const post_title = document.querySelector('#post-edit-title').value
            const post_text = document.querySelector('#post-edit-text').value
            if(post_title && post_text){
                const saveButtonEl = document.querySelector('.save-post')
                const editButtonEl = document.createElement('button')
                editButtonEl.setAttribute('class', 'edit-post btn btn-success')
                editButtonEl.textContent = 'Edit Post'
                saveButtonEl.replaceWith(editButtonEl)
                const titleEl = document.createElement('div')
                titleEl.setAttribute('class', 'title')
                titleEl.textContent = post_title
                const textEl = document.createElement('div')
                textEl.setAttribute('class', 'post-body')
                textEl.textContent = post_text
                document.querySelector('#post-edit-title').replaceWith(titleEl)
                document.querySelector('#post-edit-text').replaceWith(textEl)
                const response = await fetch(`/api/posts/${pageId}`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify({post_title, post_text})
                })
            }else {
                if(!post_title){
                    document.querySelector('#post-edit-title').setCustomValidity("Cannot be empty!")
                    document.querySelector('#post-edit-title').reportValidity()
                } else{
                    document.querySelector('#post-edit-text').setCustomValidity("Cannot be empty!")
                    document.querySelector('#post-edit-text').reportValidity()
                }
            }
        } else if (event.target.id === 'confirm-delete-post'){
            const response = await fetch(`/api/posts/${pageId}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE'
            })
            document.location.replace('/dashboard')
        }
        
    })
}

