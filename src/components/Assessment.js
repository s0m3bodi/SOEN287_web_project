class Assessment {
    constructor(type = "", name = "", deadline = "", weight = 0, isActive = true){
        this.type = type;
        this.name = name;
        this.deadline = deadline;
        this.weight = weight;
        this.isActive = isActive;
    }
}
export default Assessment;