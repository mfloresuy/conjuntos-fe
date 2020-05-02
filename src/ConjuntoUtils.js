export const ConjuntoUtils = (function () {
    return {
        groupBy: function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        },

        objArrayValues: function (objArray) {
            return Object.keys(objArray).map(k => objArray[k])
        }
    }
})();




