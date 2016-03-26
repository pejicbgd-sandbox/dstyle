module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /*uglify: {
      //options: {
       // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>'
      //},
      /*build: {
        src: 'source/js/*.js',
        dest: 'build/js/lib.min.js'
      }
    },*/
    sass: {
      dist: {
        files: {
          'source/css/style.css' : 'source/sass/prestyle.scss'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/css/style.css': ['source/css/reset.css', 'source/css/style.css']
        }
      }
    },
    watch: {
        css: {
            files: ['source/sass/*.scss','source/css/*.css'],
            tasks: ['sass', 'cssmin']
        }/*,
        js:{
            files: 'source/js/*.js',
            tasks: ['uglify']
        }*/
    },
    copy: {
        main: {
            files: [
                {
                    src: ['source/components/jquery/src/jquery.js'],
                    dest: 'build/js/jquery.js',
                    filter: 'isFile'
                },
                {
                    src: ['source/components/font-awesome/fonts/'],
                    dest: 'build/fonts/'
                },
                {
                    src: ['source/components/font-awesome/css/font-awesome.min.css'],
                    dest: 'build/css/font-awesome.min.css',
                    filter: 'isFile'
                },
                {
                    src: ['source/components/bootstrap/dist/css/bootstrap.min.css'],
                    dest: 'build/css/bootstrap.min.css',
                    filter: 'isFile'
                }
            ]
        }
    }
  });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch', 'sass', 'uglify', 'cssmin']);
    grunt.registerTask('transfer', ['copy']);

};