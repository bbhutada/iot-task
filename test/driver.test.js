/**
 * User: bhagyashributada
 */
const
    {getMessageStrForReceivedCmd, parseReceivedCommand} = require( '../src/utils' );

describe( `Testing driver methods:`, () => {

    it( 'parseCmdAndDisplayMsg: "" -> {}', () => {

        const {command, value, unit} = parseReceivedCommand( '' );
        expect( command ).toBeUndefined();
        expect( value ).toBeUndefined();
        expect( unit ).toBeUndefined();

    } );

    it( 'parseCmdAndDisplayMsg:  "S_S_____100.00_g" -> {command: "S", value: "100.00", unit: "g" ', () => {

        const {command, value, unit} = parseReceivedCommand( 'S_S_____100.00_g' );
        expect( command ).toBe( 'S' );
        expect( value ).toBe( '100.00' );
        expect( unit ).toBe( 'g' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "S" -> The current, stable weight value is 100.00 g.', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: 'S', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'The current, stable weight value is 100.00 g.' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "I" -> Command not executable. Balance is currently executing another command.', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: 'I', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'Command not executable. Balance is currently executing another command.' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "E" -> Device is disconnected', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: 'E', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'Device is disconnected' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "%" -> Command unrecognized, please check and re-enter.', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: '%', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'Command unrecognized, please check and re-enter.' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "+" -> Balance in overload range.', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: '+', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'Balance in overload range.' );

    } );

    it( 'getMessageStrForReceivedCmd for the command "-" -> Balance is in underload range.', () => {

        let
            receivedMsg = getMessageStrForReceivedCmd( {command: '-', value: '100.00', unit: 'g'} );

        expect( receivedMsg ).toBe( 'Balance is in underload range.' );

    } );

} );