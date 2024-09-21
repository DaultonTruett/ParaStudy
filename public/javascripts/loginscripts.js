
const submit = async() => {

    //const formData = new FormData(login_form);
    //const email = formData.get('email');
    //const pass = formData.get('password')

    const endpoint = 'http://localhost:3000/api';
    options = {
            method: "POST",
            body: new URLSearchParams(new FormData(login_form))
            }

    try{
       const response = await fetch(`${endpoint}/login`, options);
    } catch(e){
        console.log(e)
    };

};

const login_form = document.getElementById('login_form');

login_form.addEventListener("submit", (e) => {
    e.preventDefault()
    submit()
});