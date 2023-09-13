(function () {
    function passwords(inputChecked, inputSelector) {
        var input = document.querySelector(inputSelector);
        let check = document.querySelector(inputChecked);

        input?.addEventListener('change', function (event) {
            if (event.target.checked) check.type = 'text';
            if (!event.target.checked) check.type = 'password';
        })
    }

    passwords('.js-input-password', '.js-check-creat-password');
    passwords('.js-login-password', '.js-check-login-password');


})();