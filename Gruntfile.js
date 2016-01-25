var jsFiles = 'src/**/*.js';
var notAce = '!src/ace/**/*';
var jsonFiles = ['*.json', 'src/**/*.json', notAce];

module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      lint_jsFiles: [jsFiles, notAce]
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
            src: ['*', '**/*', '!css/*', '!js/*'],
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
    uglify: {
      uglifying_jsFiles: {
        options: {
          banner: '/*! Uglified on <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          sourceMap: true,
          sourceMapName: 'dist/js/main.js.map'
        },
        files: {
          'dist/js/main.js': ['src/js/main.js']
        }
      }
    },
    watch: {
      all: {
        files: 'src/**/*',
        tasks: ['default']
      }
    },
    browserify: {
      dist: {
        options: {
          transform: ['reactify']
        },
        files: {
          'dist/js/react/example.js': ['src/js/react/example.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('lint', ['newer:eslint', 'newer:jsonlint']);
  grunt.registerTask('test', ['lint']);
  grunt.registerTask('build', ['newer:copy', 'newer:cssmin', 'newer:uglify', 'browserify']);
  grunt.registerTask('default', ['test', 'build']);
};
