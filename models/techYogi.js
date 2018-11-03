module.exports = class TechYogi {
    constructor(name, age, id) {
        this.name = name
        this.age = age
        this.id = id
    }

    attend(yogasession) {
        yogasession.attendees.push(this)
    }

    static create({ name, age, id }) {
        return new TechYogi(name, age, id);
    }
}
