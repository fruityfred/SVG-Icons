module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-svginjector');

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
					'dest/fruityfred-icons.svg': ['*.svg'],
				},
			},		
		},
		
		svgmin: {
	        dist: {
    	        files: {
        	        'dest/fruityfred-icons-min.svg': 'dest/fruityfred-icons.svg'
            	}
	        }
	    },
	    
	    svginjector: {
			icons : {
				files: {
					'dest/fruityfred-icons.js': ['dest/fruityfred-icons-min.svg']
				},
				options: {
					container: 'icon-container'
				}
			}
		}
	});

	grunt.registerTask('default', ['svgstore:icons', 'svgmin', 'svginjector:icons']);
};

