/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('module.constants');
 * mod.thing == 'a thing'; // true
 */
const roomConfigurations: {[name: string] : IRoomConfiguration} = {
    "E46N68": {
        name: "E46N68",
        sentries: {} as ISentryConfiguration,
        workers: {
            "roomHaulers": {
                memory: {
                    role: 'roomEnergyHauler',
                    transferring: false
                },
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
                nameTemplate: 'RoomHauler{number}',
                number: 4,
            } as IWorkerConfiguration,
            "harvestersOne": {
                memory: {
                    role: 'harvesterOne',
                    resource: '57ef9e2c86f108ae6e60ee85'
                },
                body: [CARRY, MOVE, WORK, WORK, WORK, WORK, WORK],
                nameTemplate: 'HarvesterOne{number}',
                number: 1
            } as IWorkerConfiguration,
            "containerFiller": {
                memory: {
                    role: 'containerFiller',
                    transferring: false,
                    pickingUp: false,
                    pickingUpTicks: 0
                },
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
                nameTemplate: 'ContainerFiller{number}',
                number: 4,
            } as IWorkerConfiguration,
            "harvestersTwo": {
                memory: {
                    role: 'harvesterTwo',
                    resource: '57ef9e2c86f108ae6e60ee86'
                },
                body: [CARRY, MOVE, WORK, WORK, WORK, WORK, WORK],
                nameTemplate: 'HarvesterTwo{number}',
                number: 1
            } as IWorkerConfiguration,
            "builders": {
                memory: {
                    role: 'builder',
                    resource: '57ef9e2c86f108ae6e60ee85'
                },
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
                nameTemplate: 'Builder{number}',
                number: 1,
            } as IWorkerConfiguration,
            "upgraders": {
                memory: {
                    role: 'upgrader',
                    resource: '57ef9e2c86f108ae6e60ee86'
                },
                body: [CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
                nameTemplate: 'Upgrader{number}',
                number: 3
            } as IWorkerConfiguration
        }
    } as IRoomConfiguration
};
    
export const spawnConfiguration = (spawn: StructureSpawn) : IRoomConfiguration | null => {
    return roomConfigurations[spawn.room.name];
};
