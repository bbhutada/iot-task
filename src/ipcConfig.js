/**
 * User: bhagyashributada
 *
 * This module exposes methods to configure node-ipc for device and driver
 */

/**
 * This method is for driver, new ipc.IPC is used to create independent process.
 * @returns {IPC}
 */
function getIpcForDriver() {
    const ipc = require( 'node-ipc' );
    let someIPC = new ipc.IPC;
    someIPC.config.silent = true;
    someIPC.config.rawBuffer = true;
    someIPC.config.encoding = 'ascii';
    someIPC.config.id = 'driver';
    someIPC.config.retry = 3000;
    return someIPC;

}

/**
 * This method is for device server, returns configured instance of ipc
 * @returns {IPC}
 */
function getIpcForDevice() {
    const ipc = require( 'node-ipc' );
    ipc.config.silent = true;
    ipc.config.retry = 3000;
    ipc.config.rawBuffer = true;
    ipc.config.encoding = 'ascii';
    ipc.config.id = 'device';
    return ipc;
}

module.exports = {
    getIpcForDevice,
    getIpcForDriver
};