class Assessment {
    constructor(type = "", name = "", deadline = "", weight = 0, completed = 0, isActive = true){
        this.type = type;
        this.name = name;
        this.deadline = deadline;
        this.weight = weight;
        this.completed = completed;
        this.isActive = isActive;
    }
}
export default Assessment;