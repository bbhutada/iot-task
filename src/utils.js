/**
 * User: bhagyashributada
 */

/**
 * @method PUBLIC
 *
 * This method is supposed to be used with async/await
 *
 * This method accepts a input promise and returns a promise which resolves to either [err] if the input promise has exception
 * or [null, result] if input promise is successful. This give us precise results of every async operation, very similar to node.js
 * error first callback but with all the benefits of async/await with synchronous looking code having all the async goodness.
 *
 * An example usage is as below:
 * let [err, result] = await formatPromiseResult(promise);
 * //User can now handle err/result appropriately at every async/await step
 *
 * Using ES6 assignment destructuring the code looks concise and eliminates the mandatory need to have try-catch. User can still choose
 * to have try-catch but for handling any exception in synchronous code and not for any await.
 *
 * @param {Promise} prom Passed in promise to format
 * @returns {Promise<[]>} If error in prom then promise resolves to [err] else [null, result]
 */
function formatPromResult( prom ) {

    return prom
        .then( result => {
            return [null, result];
        } )
        .catch( error => {
            return [error];
        } )
}

/**
 * This method takes the entered command and returns the device response string
 * @param {string} command
 * @returns {string}
 */
function getCommandStr( command ) {

    let
        cmdStr = '';

    switch( command ) {
        case 's':
            cmdStr = 'S_S_____100.00_g';
            break;
        case 'i':
            cmdStr = 'S_I';
            break;
        case '+':
            cmdStr = 'S_+';
            break;
        case '-':
            cmdStr = `S_-`;
            break;
        case 'x':
            cmdStr = `S_E`;
            break;
        default:
            cmdStr = `S_%`;
            break;
    }
    return cmdStr;
}

/**
 * This method takes in parsed command object and return the command message accordingly
 * @param {Object} cmdObj = {command, value, unit}
 * @returns {string}
 */
function getMessageStrForReceivedCmd( cmdObj ) {

    let
        {command, value, unit} = cmdObj;

    switch( command ) {
        case 'S':
            return `The current, stable weight value is ${value} ${unit}.`;
        case 'I':
            return `Command not executable. Balance is currently executing another command.`;
        case 'E':
            return `Device is disconnected`;
        case '%':
            return `Command unrecognized, please check and re-enter.`;
        case '+':
            return `Balance in overload range.`;
        case '-':
            return `Balance is in underload range.`;
    }

}

/**
 * This method takes in the response from the device server for the entered command and parses it to obtain command,
 * value and unit
 * @param {string} receivedStr
 * @returns {{unit: string, value: string, command: string}}
 */
function parseReceivedCommand( receivedStr ) {
    let
        [, command, value, unit] = receivedStr && receivedStr.split( "_" ).filter( Boolean );

    return {command, value, unit};
}

/**
 *  This method is used to display colored logs for CLI interface. Chalk npm library is used.
 * @param {string} str
 * @param {string} color
 * @returns {*}
 */
function displayLog( str, color ) {
    const
        chalk = require( 'chalk' );
    return chalk[color]( str );
}

module.exports = {
    formatPromResult,
    getCommandStr,
    parseReceivedCommand,
    displayLog,
    getMessageStrForReceivedCmd
};