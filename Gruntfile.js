module.exports = function (grunt) {

	'use strict';

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		jshint: {
			grunt: {
				options: {node: true},
				globals: {module: true},
				src: 'Gruntfile.js'
			}
		},

		copy: {
			dist: {
				files: [
					{src: 'src/index.html', dest: 'dist/index.html'}
				]
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'dist/css/style.css': 'src/css/style.scss'
				}
			}
		},

		clean: {
			build: ['dist']
		},

		watch: {
			sass: {
				files: 'src/css/**/*.scss',
				tasks: 'sass:dist',
				interrupt: true
			},
			html: {
				files: 'src/index.html',
				tasks: 'copy:dist',
				interrupt: true
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: 'dist'
				}
			}
		}

	});

	grunt.registerTask('build', ['jshint','clean','copy','sass']);

	grunt.registerTask('server', ['build', 'connect:server', 'watch']);

	grunt.registerTask('default',['build']);

};