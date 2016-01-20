var jsFiles = ['*.js', 'src/js/*.js', 'src/*.js'];
var jsonFiles = ['*.json', 'src/*.json'];

module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      lint_jsFiles: jsFiles
    },
    jsonlint: {
      lint_jsonFiles: jsonFiles
    },
    sync: {
      copy_untouched_resources_to_dist: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*', '!css/*', '!js/*'],
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
          sourceMapName: 'dist/js/sourcemap.map'
        },
        files: {
          'dist/js/main.js': ['src/js/main.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*'],
        tasks: ['default'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', ['lint', 'buildDist']);
  grunt.registerTask('lint', ['eslint', 'jsonlint']);
  grunt.registerTask('buildDist', ['sync', 'cssmin', 'uglify']);
  grunt.registerTask('w', ['watch']);
};
