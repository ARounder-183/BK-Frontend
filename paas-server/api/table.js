/**
 * @file mock table api
 */

const faker = require("faker");

module.exports = function (app) {
    app.get("/api/table/list", (req, res) => {
        const query = req.query || {};
        const pageSize = parseInt(query.pageSize, 10) || 10;
        const page = parseInt(query.page, 10) || 1;
        const list = [];
        for (let i = 0; i < pageSize; i++) {
            const country = faker.address.country();
            const city = faker.address.city();
            list.push({
                id: i + 1,
                ip: faker.internet.ip(),
                country: country,
                city: city,
                fullAddress: country + city + faker.address.streetAddress(),
                domain: faker.internet.domainName(),
                email: faker.internet.email(),
                image: faker.image.image(),
                name: faker.name.findName(),
            });
        }
        res.json({
            code: 0,
            message: "ok",
            data: {
                count: 100,
                results: list,
            },
        });
    });
};
