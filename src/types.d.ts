// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
    role: string;
    size: string;
    room: string;
    working: boolean;
}

interface Memory {
    uuid: number;
    log: any;
}

interface StorageMemory {
    id: string;
    storageType: string;
    extractable: boolean;
}

type AnyContainer = StructureContainer | StructureStorage;
type EnergyStructure = StructureSpawn | StructureTower | StructureExtension;

// `global` extension samples
declare namespace NodeJS {
    interface Global {
        log: any;
    }
}
