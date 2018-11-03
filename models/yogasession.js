const chalk = require('chalk')

module.exports = class Yogasession {
    constructor(name, location) {
        this.name = name
        this.location = location
        this.attendees = []
    }

    report() {
        console.log(chalk.blue.bgRed.bold(this.name), 'Yogasession is held at', chalk.green(this.location), 'and number of attendees are', this.attendees.length)
    }
}
