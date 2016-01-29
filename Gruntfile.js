var jsFiles = 'src/react/*.js';
var notAce = '!src/ace/**/*';
var jsonFiles = ['*.json', 'src/**/*.json', notAce];

module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      lint_jsFiles: [jsFiles, notAce, '!src/js/FileSaver.min.js']
    },
    jsonlint: {
      lint_jsonFiles: jsonFiles
    },
    copy: {
      copy_untouched_resources_to_dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['*', '**/*', '!css/custom.css', '!js/cookie.js', '!js/react/*'],
            dest: 'dist'
          }
        ]
      }
    },
    cssmin: {
      minifying_cssFiles: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: '*.css',
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      all: {
        files: 'src/**/*',
        tasks: ['default']
      }
    },
    browserify: {
      react: {
        options: {
          transform: ['reactify']
        },
        files: {
          'dist/js/react/example.js': ['src/js/react/example.js'],
        }
      },
      normal: {
        files: {
          'dist/js/cookie.js': ['src/js/cookie.js']
        }
      }
    },
    clean: ["dist"]
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('lint', ['newer:eslint', 'newer:jsonlint']);
  grunt.registerTask('test', ['lint']);
  grunt.registerTask('build', ['newer:copy', 'newer:cssmin', 'browserify']);
  grunt.registerTask('production', ['copy', 'cssmin', 'browserify']);
  grunt.registerTask('default', ['test', 'build']);
};
