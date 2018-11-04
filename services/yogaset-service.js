const fs = require('fs')

const YogasetModel = require('../models/yogaset')

const dbPath = `${__dirname}/../yogaset-database.json`

async function findAll() {
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, 'utf8', (err, file) => {
            if (err) return reject(err)

            const yogakriya = JSON.parse(file).map(YogasetModel.create)

            resolve(yogakriya)
        })
    })
}

async function add(yogaset) {
    const allYogakriya = await findAll()
    const lastYogaset = allYogakriya[allYogakriya.length - 1]
    const lastYogasetsId = lastYogaset && lastYogaset.id || 0
    yogaset.id = lastYogasetsId + 1

    yogaset = YogasetModel.create(yogaset)
    allYogakriya.push(yogaset)

    await saveAll(allYogakriya)

    return yogaset
}

async function del(yogasetId) {
    const allYogakriya = await findAll()
    const yogasetIndex = allYogakriya.findIndex(tYogakriya => tYogakriya.id == yogasetId)
    if (yogasetIndex < 0) return

    allYogakriya.splice(yogasetIndex, 1)

    saveAll(allYogakriya)
}

async function find(yogasetId) {
    const allYogakriya = await findAll()

    return allYogakriya.find(tYogakriya => tYogakriya.id == yogasetId)
}

async function saveAll(yogakriya) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dbPath, JSON.stringify(yogakriya), (err, file) => {
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
