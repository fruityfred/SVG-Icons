module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-svgstore');
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
				convertNameToId: function(name) {
            		return name.replace(/^\w+\_/, '');
          		}
			},
			icons : {
				files: {
					'dest/fruityfred-icons.svg': ['*.svg'],
				},
			},		
		},
		
	    svginjector: {
			icons : {
				files: {
					'dest/fruityfred-icons.js': ['dest/fruityfred-icons.svg']
				},
				options: {
					container: 'icon-container'
				}
			}
		},
		
		createhtmldemo: {
			default: {
				files: {
					'dest/demo.html': ['*.svg']
				}
			}
		}
	});
	
	
	grunt.registerMultiTask('createhtmldemo', 'Creates the HTML demo file.', function(a, b) {
		var path = require('path');
		
		var	demoJS = grunt.file.read('demo-tpl.html'),
			icons = [];

		this.files.forEach(function(file) {
			grunt.log.writeln(file.src.length + ' icons found.');
			file.src.forEach(function (svgFile) {
				icons.push(path.basename(svgFile, '.svg'));
			});
			demoJS = demoJS.replace('###ICONS###', "['" + icons.join("','") + "'];");
			grunt.file.write(file.dest, demoJS);
			grunt.log.writeln('Demo generated for ' + file.src.length + ' icons.');
		});
	});

	grunt.registerTask('default', ['svgstore:icons', 'svginjector:icons', 'createhtmldemo']);
};

