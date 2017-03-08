/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("validateUtils", {
        validateRequired: validateRequired,
        validateEmail: validateEmail
    });

    var emailValidationPattern = /\w+@\w+\.\w+/;

    function validateRequired(value) {
        return value !== "";
    }

    function validateEmail(email) {
        return emailValidationPattern.test(email);
    }
})();