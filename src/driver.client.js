/**
 * User: bhagyashributada
 *
 * This module is the driver acts as client
 */

const
    {cliInterface} = require( './cliInterface' ),
    {formatPromResult, parseReceivedCommand, displayLog, getMessageStrForReceivedCmd} = require( './utils' ),
    ipc = require( './ipcConfig' ).getIpcForDriver();

/**
 * @method PRIVATE
 *
 * This method provides command line interface for user interaction and sends the command msg to device server
 *
 * @param socket
 * @returns {Promise<command>} It resolves to answers provided by user on CLI and rejects when error
 */
async function provideCliInterface( socket ) {

    console.log( displayLog( `\nDriver is listening\nWelcome to IOT device\n`, 'blue' ) );

    const
        [err, command] = await formatPromResult( cliInterface() );

    if( err ) {
        console.log( displayLog( `Error Occurred: ${err.stack || err}`, 'red' ) );
        return;
    }

    ipc.server.emit( socket, command );
}

/**
 *
 * @method PRIVATE
 *
 * This method receives the response from the device server for the entered command and then it is parsed to interpret
 *  the message. It displays the message and than again waits for the user to enter new command
 *
 * @param data
 * @param socket
 * @returns {Promise<command>} It resolves to answers provided by user on CLI and rejects when error
 */
async function parseCmdAndDisplayMsg( data, socket ) {

    const
        commandObj = parseReceivedCommand( data.toString() ),
        receivedMsg = getMessageStrForReceivedCmd( commandObj );

    console.log( displayLog( `\nDriver: ${receivedMsg}\n`, 'green' ) );

    // Ask for new command again
    const
        [err, command] = await formatPromResult( cliInterface() );

    if( err ) {
        console.log( displayLog( `Error Occurred: ${err.stack || err}`, 'red' ) );
        return;
    }

    ipc.server.emit( socket, command );
}

/**
 * This method just logs error message
 * @param err
 */
function errorMsg( err ) {
    console.log( displayLog( `Error Occurred: ${err.message} with error code ${err.code}, Please restart the Device`, 'red' ) );
}

/**
 *  This is the start of the driver process, "node-ipc" npm library is used for Inter Process Communication between two
 *  independent processes. This method starts driver and connects to server for further communication.
 */
function startDriver() {
    ipc.serve( () => {

        // After connecting, provides cli interface to enter command
        ipc.server.on( 'connect', provideCliInterface );

        // Receives the device command from device process and parses it to return message
        ipc.server.on( 'data', parseCmdAndDisplayMsg );

        //Displays error message, especially when the socket connection is disconnected
        ipc.server.on( 'error', errorMsg );

    } );
    ipc.server.start();
}

if( process.env['NODE_ENV:'] !== 'test' ) {
    startDriver();
}
