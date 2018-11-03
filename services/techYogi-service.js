const fs = require('fs')

const TechyogiModel = require('../models/techYogi')

const dbPath = `${__dirname}/../techYogi-database.json`

async function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)

            const yogi = JSON.parse(file).map(TechyogiModel.create)

            resolve(yogi)
        })
    })
}

async function add(techYogi) {
    const allYogi = await findAll()
    const lastTechYogi = allYogi[allYogi.length - 1]
    const lastTechYogisId = lastTechYogi && lastTechYogi.id || 0
    techYogi.id = lastTechYogisId + 1

    techYogi = TechyogiModel.create(techYogi)
    allYogi.push(techYogi)

    await saveAll(allYogi)

    return techYogi
}

async function del(techYogiId) {
    const allYogi = await findAll()
    const techYogiIndex = allYogi.findIndex(tYogi => tYogi.id == techYogiId)
    if (techYogiIndex < 0) return

    allYogi.splice(techYogiIndex, 1)

    saveAll(allYogi)
}

async function find(techYogiId) {
    const allYogi = await findAll()

    return allYogi.find(tYogi => tYogi.id == techYogiId)
}

async function saveAll(yogi) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(yogi), (err, file) => {
            if (err) return reject(err)

            resolve()
        })
    })
}

module.exports = {
    findAll,
    find,
    add,
    del
}
