"use strict";

module.exports = function( grunt ) {

grunt.registerTask( "authors", "Generate a list of authors in order of first contribution", function() {
	var done = this.async();

	grunt.util.spawn({
		cmd: "git",
		args: [ "log", "--pretty=%aN <%aE>" ]
	}, function( err, result ) {
		if ( err ) {
			grunt.log.error( err );
			return done( false );
		}

		var authors,
			tracked = {};
		authors = result.stdout.split( "\n" ).reverse().filter(function( author ) {
			var first = !tracked[ author ];
			tracked[ author ] = true;
			return first;
		}).join( "\n" );
		grunt.log.writeln( authors );
		done();
	});
});

};