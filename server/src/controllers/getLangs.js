const { Language } = require('../db.js');

const getLangsByArea = async (area) => {
    return await Language.findAll({
        where: {
            area: area
        }
    });
}

const getAllLangs = async () => {
    return await Language.findAll()
}

module.exports = {
    getLangsByArea,
    getAllLangs
}