const router = require("express").Router();
const { getLangsByArea, getAllLangs } = require("../../controllers/getLangs.js");

router.get("/", async function (req, res, next) {
    const { area } = req.query;
    try {
        if (area) {
            return res.json(await getLangsByArea(area))
        } else {
            return res.json(await getAllLangs())
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

module.exports = router;