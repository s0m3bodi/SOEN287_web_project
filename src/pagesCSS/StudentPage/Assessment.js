class Assessment {
    constructor(type, deadline, weight){
        this.type = type;
        this.deadline = deadline;
        this.weight = weight;
    }

    type(){
        return this.type;
    }

    deadline(){
        return this.deadline;
    }

    weight(){
        return this.weight;
    }
}