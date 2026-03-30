class Assessment {
    constructor(type, name, deadline, weight){
        this.type = type;
        this.name = name;
        this.deadline = deadline;
        this.weight = weight;
    }

    type(){
        return this.type;
    }

    name(){
        return this.name;
    }

    deadline(){
        return this.deadline;
    }

    weight(){
        return this.weight;
    }
}