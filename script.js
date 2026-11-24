document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    var errorSummary = document.getElementById("error-summary");
    var errorList = document.getElementById("error-list");
    var statusMsg = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        var errors = [];
        
        document.querySelectorAll('.error-msg').forEach(function(el) { el.style.display = 'none'; });
        document.querySelectorAll('input, select').forEach(function(el) { el.style.border = ''; });

        var name = document.getElementById("name");
        var email = document.getElementById("email");
        var car = document.getElementById("car");
        var contact = document.querySelector('input[name="contact"]:checked');

        if (!name.value.trim()) { errors.push({id: 'name', msg: 'Full name is required.'}); name.style.border = '2px solid red'; }
        if (!email.value.trim() || !email.value.includes('@')) { errors.push({id: 'email', msg: 'Valid email is required.'}); email.style.border = '2px solid red'; }
        if (!car.value) { errors.push({id: 'car', msg: 'Please select a vehicle.'}); car.style.border = '2px solid red'; }
        if (!contact) { errors.push({id: 'contact-error', msg: 'Please select a contact method.'}); }

        if (errors.length > 0) {
            errorList.innerHTML = '';
            errors.forEach(function(err) {
                var li = document.createElement('li');
                li.innerHTML = '<a href="#' + err.id + '">' + err.msg + '</a>';
                errorList.appendChild(li);
                
                var span = document.getElementById(err.id.replace('name','name-error').replace('email','email-error').replace('car','car-error').replace('contact-error','contact-error'));
                if(span) span.style.display = 'block';
            });
            errorSummary.style.display = 'block';
            errorSummary.focus();
        } else {
            errorSummary.style.display = 'none';
            statusMsg.style.display = 'block';
            statusMsg.focus();
            form.reset();
        }
    });
});