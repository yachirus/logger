module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      templates: {
        files: ['templates/*.template'],
        tasks: ['hogan'],
        options: {
        },
      },
    },

    hogan: {
      recordview : {
        src : 'templates/*.template',
        dest : 'templates/templates.js',
        options : { binderName: 'amd' }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hogan');

  grunt.registerTask('default', ['watch']);
};
