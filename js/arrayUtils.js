/**
 * Created by AterStrix on 08.03.2017.
 */
(function () {
    "use strict";
    app.addModule("arrayUtils", {
        sortArray: sortArray,
        findInArray: findInArray
    });

    var emailValidationPattern = /\w+@\w+\.\w+/;

    function sortArray(array, field, direction) {
        if ($.type(array[0][field]) === 'date') {
            array.sort(function (a, b) {
                return sortDate(a[field], b[field]);
            })
        }
        else if ($.type(array[0][field]) === 'string') {
            array.sort(function (a, b) {
                return sortText(a[field], b[field]);
            })
        }
        if (direction === 'descending') {
            array.reverse();
        }
    }

    function findInArray(array, value) {
        if ($.type(value) === 'object') {
            return array.reduce(function (findedValue, elem) {
                var finded = true;
                for(var key in value) {
                    if (elem[key] !== value[key]) {
                        return findedValue;
                    }
                }
                return findedValue || elem;
            }, undefined);
        }
        else {
            return array.reduce(function (findedValue, elem) {
                return findedValue || elem === value ? elem : undefined;
            }, undefined);
        }
    }

    function sortDate(a, b) {
        return a - b;
    }

    function sortText(a, b) {
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }
        else if (b.toLowerCase() > a.toLowerCase()) {
            return -1;
        }
    }
})();