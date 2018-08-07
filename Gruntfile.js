module.exports = function(grunt) {
  grunt.file.setBase('./');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    uglify: {
      options: {
        reserved: ['jQuery', '$'],
        sourceMap: true,
        sourceMapName: '<%= pkg.name %>.map'
      },
      build: {
        src: ['./js/jquery.js', './js/bootstrap.min.js','./js/analitics.js', './js/src/**.js'],
        dest: '<%= pkg.name %>.min.js'
      }
    },
    less: {
      production: {
        options: {
          paths: ['css'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))({advanced: true})
          ]
        },
        files: {
          'app.css': 'css/app.less'
        }
      }
    },
    watch: {
      styles: {
        files: ['css/**/**.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['app.css'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['joyoflife.min.js'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['img/**'], dest: 'build/'},
          {expand: true, src: ['*.html', 'events/*.html'], dest: 'build/'}
        ],
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less']);
  grunt.registerTask('styles', ['less']);
  grunt.registerTask('copyBuild', ['copy']);
  grunt.registerTask('watch:less', ['less', 'watch']);
};