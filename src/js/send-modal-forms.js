document.addEventListener("DOMContentLoaded", function () {
    let registerForm = document.querySelector('#form-register');
    let authForm = document.querySelector('#form-auth');
    let callbackForm = document.querySelector('#form-callback');

    if (!registerForm || !authForm || !callbackForm) return;

    registerForm.addEventListener('submit', ajaxSubmit);
    authForm.addEventListener('submit', ajaxSubmit);
    callbackForm.addEventListener('submit', ajaxSubmit);

    function ajaxSubmit(e) {
        e.preventDefault();

        removeAllErrors(this);

        let data = new FormData(this),
            attr = this.dataset.url
        let url = getFormUrl(attr),
            self = this;

        let req = fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });

        req.then(res => {
            let promise = res.json();
            promise.then(data => {
                if (data.status === 'success') {
                    window.location.reload();
                } else if (data.status === 'error') {
                    addErrorsToForm(self, data.errors);
                }
            })
        })
    }

    function getFormUrl(attr) {
        switch (attr) {
            case 'register':
                return '/assets/responses/'+attr+'.json';
                break;
            case 'auth':
                return '/assets/responses/'+attr+'.json';
                break;
            case 'callback':
                return '/assets/responses/'+attr+'.json';
                break;
        }
    }

    function addErrorsToForm(form, errArray) {
        getFormElems(form);

        for (let i = 0; i < errArray.length; i++) {
            let error = errArray[i];
            for (key in error) {
                let input = document.querySelector('[name=' + key + ']');
                if (input) {
                    input.classList.add('error');
                    let node = createErrorNode(error[key]);
                    input.parentNode.append(node);
                }
            }
        }
    }

    function createErrorNode(text) {
        let errorNode = document.createElement('div');
        errorNode.classList.add('error', 'error__form-field');
        errorNode.innerText = text;

        return errorNode;
    }

    function getFormElems(form) {
        let inputs = form.elements,
            res = {};
        for (let i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            if (input.type !== 'submit') {
                input.addEventListener('input', removeErrorNode.bind(null, input));

                if (input.type === 'password') {
                    res[input.name] = ''
                } else {
                    res[input.name] = input.value;
                }
            }
        }
        return res;
    }

    function removeErrorNode(input) {
        let errorNode = input.nextElementSibling;

        if (input.classList.contains('error') && errorNode.classList.contains('error')) {
            input.classList.remove('error');
            errorNode.remove();
        }
    }

    function removeAllErrors(form) {
        for (let i = 0; i < form.elements.length; i++) {
            let elem = form.elements[i];
            if(elem.type !== 'submit'){
                removeErrorNode(elem);
            }
        }
    }
})