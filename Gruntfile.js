
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %>\n <%= pkg.author %>\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'static/app.min.js': 'static/githubApp/**/*.js'
                }
            }
        },
        watch: {
            scripts: {
                files: 'static/githubApp/**/*.js',
                tasks: ['uglify']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
