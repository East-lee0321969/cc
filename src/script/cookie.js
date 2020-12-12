let cookie = {
    set: function(name, value, days) {
        let d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${name}=${encodeURIComponent(value)};path=/;expires=${d}`;
    },
    get: function(name) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (newarr[0] === name) {
                return newarr[1]
            }
        }
    },
    remove: function(name) {
        cookie.set(name, '', -1);
    }
};