module.exports = {
    getLanguage(usersDB) {
        if (usersDB) {
            if (usersDB.language) {
                let language = require(`../language/${usersDB.language}.json`)
                return language;
            } else {
                let language = require(`../language/fr.json`)
                return language;
            }
        } else {
            let language = require(`../language/fr.json`)
            return language;
        }
    },
};
