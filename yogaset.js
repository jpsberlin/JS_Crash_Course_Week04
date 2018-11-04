module.exports = class Yogaset {
    constructor(name, time, id) {
        this.name = name
        this.time = time
        this.id = id
    }

    attend(yogasession) {
        yogasession.attendees.push(this)
    }

    static create({ name, time, id }) {
        return new Yogaset(name, time, id);
    }
}
