class CheckList {
    constructor(title, isCompleted = false) {
        this.title = title
        this.isCompleted = isCompleted
    }

    updateCheckInfo(attribute, value) {
        this[attribute] = value
    }
}

export default CheckList