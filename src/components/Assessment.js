class Assessment {
    constructor(type = "", name = "", deadline = "", weight = 0, isActive = true, completed = 0){
        this.type = type;
        this.name = name;
        this.deadline = deadline;
        this.weight = weight;
        this.isActive = isActive;
        this.completed = completed;
    }
}
export default Assessment;