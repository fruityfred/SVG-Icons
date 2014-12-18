module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-svgstore');

	grunt.initConfig({
		svgstore: {
			options: {
				prefix : 'icon-',
				svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
					xmlns: 'http://www.w3.org/2000/svg',
					version: '1.1'
				},
				inheritviewbox: true,
				includedemo: true
			},
			icons : {
				files: {
					'dest/dest.svg': ['*.svg'],
				},
			},		
		},
	});

	grunt.registerTask('default', ['svgstore:icons']);
};

