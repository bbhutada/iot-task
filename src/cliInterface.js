/**
 * User: bhagyashributada
 *
 * This is an cli interface for the user interaction
 */
const
    {createInterface} = require( 'readline' ),
    {displayLog} = require( './utils' );

/**
 * This method uses readline module of node.js to create a CLI interface.
 * @returns {Promise<command>} Resolves to command
 */
function cliInterface() {
    const
        commandLineInterface = createInterface( {
            input: process.stdin,
            output: process.stdout
        } );

    return new Promise( function( resolve, reject ) {
        commandLineInterface.question( displayLog( '$Enter command to get Stable Weight Value: ', 'red' ), ( command, err ) => {

            // set default value to 's'
            if( !command || !command.trim() ) {
                console.log( displayLog( `Command was not entered so default command 's' is used`, 'red' ) );
                command = 's';
            }
            commandLineInterface.close();
            resolve( command );
        } );
    } )

}

module.exports = {
    cliInterface
};