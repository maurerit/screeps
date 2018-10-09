export class Builder {
    public static run(creep: Creep) {
        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 fillup');
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            let targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);
            let workFound = false;
            if(targets.length) {
                workFound = true;
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            let structures: AnyStructure[] = creep.room.find(FIND_STRUCTURES, {filter: (s) => (s.structureType === STRUCTURE_CONTAINER ||
                    s.structureType === STRUCTURE_RAMPART ||
                    s.structureType === STRUCTURE_TOWER) && (s.hits < s.hitsMax)});
            if ( !workFound && structures.length ) {
                workFound = true;
                structures.sort((s1: AnyStructure, s2: AnyStructure) => s1.hits - s2.hits)
                if ( creep.repair(structures[0]) === ERR_NOT_IN_RANGE ) {
                    creep.moveTo(structures[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            let availableContainers = _.filter(Memory.storage, (obj: StorageMemory) => obj.storageType === RESOURCE_ENERGY && obj.extractable);
            let possibleTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    for ( let containerIdx in availableContainers ) {
                        if ( availableContainers[containerIdx].id === structure.id ) {
                            return true;
                        }
                    }
                    return false;
                }
            });

            let closest = creep.pos.findClosestByRange(possibleTargets, {filter: (structure: AnyContainer) => structure.store && structure.store[RESOURCE_ENERGY] > 0})
            if(creep.withdraw(closest!, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closest!, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
