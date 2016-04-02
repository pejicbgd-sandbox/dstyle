module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'source/js/custom.js',
                dest: 'build/js/lib.min.js'
            }
        },

        //compile sass files
        sass: {
            dist: {
                files: {
                    'source/css/prestyle.css' : 'source/sass/style.scss'
                }
            }
        },

        //minimize css file(s)
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/css/style.css': ['source/css/prestyle.css']
                }
            }
        },

        //run js hint on file prior to and after concat
        jshint: {
            beforeconcat: ['custom.js'],
            afterconcat: ['custom.js']
        },

        //use "copy" package to copy files installed by bower,
        //run it manually after initial bower install, or whenever bower packages are updated
        copy: {
            main: {
                files: [
                    {
                        src: ['source/components/jquery/dist/jquery.min.js'],
                        dest: 'build/js/jquery.js',
                        filter: 'isFile'
                    },
                    {
                        src: ['source/components/font-awesome/fonts/'],
                        dest: 'build/fonts/'
                    },
                    {
                        src: ['source/components/bootstrap/dist/css/bootstrap.min.css'],
                        dest: 'build/js/jquery.js',
                        filter: 'isFile'
                    },
                    {
                        src: ['source/components/fancybox/source/jquery.fancybox.pack.js'],
                        dest: 'build/js/jquery.fancybox.pack.js',
                        filter: 'isFile'
                    }
                ]
            }
        },
        //watch files for changes
        watch: {
            css: {
                files: ['source/sass/*.scss', 'source/css/*.css'],
                tasks: ['sass', 'cssmin']
            },
            js:{
                files: 'source/js/custom.js',
                tasks: ['uglify']
            }
        }
    });

    //require all tasks from installed packages
    require('load-grunt-tasks')(grunt);

    //register default task
    grunt.registerTask('default', ['watch', 'sass', 'uglify', 'concat_css', 'cssmin', 'jshint']);

    //be sure not to give task the same name as package
    //seen some bugs caused by this
    grunt.registerTask('transfer', ['copy']);
};
