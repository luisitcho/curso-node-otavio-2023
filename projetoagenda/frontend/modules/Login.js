import validator from "validator";

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);

    }

    init() {
        this.events();
    }


    valid(e) {
        const el = e.target;
        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');
        const emailError = el.querySelector('.js-email-error')
        const passwordError = el.querySelector('.js-password-error')
        let error = false;

        // Valida o email
        if (!validator.isEmail(email.value)) {

            email.classList.remove('is-valid')
            email.classList.add('is-invalid')
            emailError.style.display = 'block';
            emailError.innerText = 'E-mail inválido!'
            error = true
        } else {
            email.classList.remove('is-invalid')
            email.classList.add('is-valid')
            emailError.style.display = 'none';
        }

        // Valida a senha
        if (password.value.length < 4 || password.value.length > 12) {

            password.classList.remove('is-valid');
            password.classList.add('is-invalid');
            passwordError.style.display = 'block';
            passwordError.innerText = 'A senha precisa ter entre 8 e 12 catacteres!';
            error = true
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
            passwordError.style.display = 'none';
        }

        if (!error) el.submit();
    }

    events() {

        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            this.valid(e);
        })
    }
}