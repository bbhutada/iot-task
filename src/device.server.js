/**
 * User: bhagyashributada
 *
 * This module is the device server
 */

const
    {getCommandStr, displayLog} = require( './utils' ),
    ipc = require( './ipcConfig' ).getIpcForDevice();

/**
 * @method PRIVATE
 *
 * This method is used by device server to validate and send response to driver for the provided command
 * Also if the command is 'x' it disconnects all the connections established via ipc.of
 *
 * @param {string} command
 * @returns {Promise<any>} If successful then resolves to undefined
 */
function validateAndExecuteCommand( command ) {

    return new Promise( ( resolve, reject ) => {

        setTimeout( () => {
            command = command && command.toString().toLowerCase();

            const commandStr = getCommandStr( command );
            console.log( `Sending value ${commandStr}\n` );

            ipc.of.driver.emit( commandStr );

            if( command === 'x' ) {
                ipc.disconnect( 'driver' );
            }
            resolve();
        }, 2000 );
    } )
}

/**
 *
 * Starts device server, "node-ipc" npm library is used for Inter Process Communication between two
 * independent processes. This method connects to driver to receive and send commands.
 */
function connectToDevice() {

    ipc.connectTo( 'driver', () => {

        ipc.of.driver.on( 'connect', () => {
            console.log( displayLog( 'Device is online\n', 'blue' ) );
        } );

        ipc.of.driver.on( 'data', async ( command ) => {
            console.log( displayLog( `Received command: ${command.toString()}`, 'green' ) );
            await validateAndExecuteCommand( command );
        } );
    } )
}

if( process.env['NODE_ENV:'] !== 'test' ) {
    connectToDevice();
}
