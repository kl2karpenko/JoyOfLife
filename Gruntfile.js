module.exports = function(grunt) {
  grunt.file.setBase('./');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    uglify: {
      build: {
        src: ['./src/**.js'],
        dest: 'build/<%= pkg.name %>.min.js'
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
        files: ['css/**.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'less']);
  grunt.registerTask('styles', ['less']);
  grunt.registerTask('watch:less', ['less', 'watch']);
};