if (document.querySelector('#login-form')){
    const loginForm = document.querySelector('#login-form')
    loginForm.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password-login').value
        console.log(email, password)
        const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		})
        if(response.ok){
            document.location.replace('/')
        }else{
            console.log(response)
            document.querySelector('#password-login').setCustomValidity("Invalid Account Information!")
            document.querySelector('#password-login').reportValidity()
        }
    })
}else {
    const signupForm = document.querySelector('#signup-form')
    signupForm.addEventListener('submit', async (event)=>{
        event.preventDefault()
        const email = document.querySelector('#email').value
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password-login').value
        const response = await fetch("/api/users", {
			method: "post",
			body: JSON.stringify({
				email,
                username,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		})
        if(response.ok){
            document.location.replace("/")
        }
    })
}