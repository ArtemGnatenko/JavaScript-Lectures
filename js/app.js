/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    var modules = {};
    var app = {};
    app.addModule = addModule;
    app.getModule = getModule;
    app.addMethod = addMethod;
    window.app = app;

    function addModule(moduleName, module) {
        if (modules[moduleName]) {
            throw("Module already exist");
        }
        else {
            var fn = new Function("return function " + moduleName + "(){}")();
            fn.prototype = module;
            modules[moduleName] = fn;
        }
    }

    function getModule(moduleName) {
        if (modules[moduleName]) {
            return new modules[moduleName]();
        }
        else {
            throw("Module does not exist");
        }
    }

    function addMethod(moduleName, methodName, method) {
        if (!modules[moduleName]) {
            throw("Module does not exist");
        }
        else if (modules[moduleName].prototype[methodName]) {
            throw("Method already exist");
        }
        else {
            modules[moduleName].prototype[methodName] = method;
        }
    }
})();