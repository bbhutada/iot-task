const
    {getCommandStr} = require( '../src/utils' );

describe( `Testing device methods:`, () => {

    it( 'getCommandStr: "s" -> "S_S_____100.00_g"  ', () => {

        let
            str = getCommandStr( 's' );
        expect( str ).toBe( 'S_S_____100.00_g' );

    } );

    it( 'getCommandStr: "x" -> "S_E"  ', () => {

        let
            str = getCommandStr( 'x' );
        expect( str ).toBe( 'S_E' );

    } );

    it( 'getCommandStr: "+" -> "S_+"  ', () => {

        let
            str = getCommandStr( '+' );
        expect( str ).toBe( 'S_+' );

    } );

    it( 'getCommandStr: "-" -> "S_-"  ', () => {

        let
            str = getCommandStr( '-' );
        expect( str ).toBe( 'S_-' );

    } );

    it( 'getCommandStr: "u" -> "S_%"  ', () => {

        let
            str = getCommandStr( 'd' );
        expect( str ).toBe( 'S_%' );

    } )
} );