interface CreepMemory {
    resource: string;
    role: string;
    transferring: boolean;
    pickingUp: boolean;
    pickingUpTicks: number;
    upgrading: boolean;
    building: boolean;
}

interface IWorkerConfiguration {
    body: string[];
    memory: CreepMemory;
    nameTemplate: string;
    number: number;
}

interface ISentryConfiguration {

}

interface IRoomConfiguration {
    name: string;
    sentries: ISentryConfiguration;
    workers: { [name: string]: IWorkerConfiguration};
}
