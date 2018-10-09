export class Harvester {
    public static run(creep: Creep): void {
        if (creep.carry.energy === 0) {
            creep.memory.transferring = false;
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.transferring) {
            this.harvest(creep);
        }
        else {
            creep.drop(RESOURCE_ENERGY);
            this.harvest(creep);
        }
    }

    public static harvest(creep: Creep): void {
        let sources = creep.room.find(FIND_SOURCES, {filter: (resource) => (resource.id === creep.memory.resource && resource.energy > 0)});
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
