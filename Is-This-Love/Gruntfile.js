module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		concat:{
			dist:{
				src: ['src/scripts/particles.js', 'src/scripts/**/*.js'],
				dest: "dist/scripts/production.js",
			}
		},

		uglify: {
		    build: {
		        src: 'dist/scripts/production.js',
		        dest: 'dist/scripts/production.min.js'
		    }
		},

		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'src/images',
		            src: ['**/*.{png,jpg,gif,svg,ico}'],
		            dest: 'dist/images/'
		        }]
		    }
		},

		sass: {
		    dist: {
		        options: {
		            style: 'compressed'
		        },
		        files: {
		            'dist/main.css': 'src/stylesheets/main.scss'
		        }
		    } 
		},

		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['src/*.mp3'], dest: 'dist/'},
					{expand: true, flatten: true, src: ['src/*.json'], dest: 'dist/'},
				],
			},
		},

		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: 'src/scripts/**/*.js',
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    images: {
		    	files: 'src/images/**/*',
		    	tasks: ['imagemin'],
		    	options: {
		    		spawn: false,
		    	}
		    },
		    css: {
			    files: 'src/stylesheets/**/*.scss',
			    tasks: ['sass'],
			    options: {
			        spawn: false,
			    }
			},
			html: {
				files: '*.html',
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'copy', 'sass', 'watch']);
	grunt.registerTask('build', ['concat', 'uglify', 'imagemin', 'copy', 'sass']);
}