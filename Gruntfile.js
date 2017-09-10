module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    //constant
    dir: {
        build: "build"
    },

    //replace task
    replace: {
      dbHost: {
        src: ["<%=dir.build %>/**/*.js"], 
        dest: "<%=dir.build %>/", 
        replacements: [
          {
            from: "localhost", 
            to: "192.168.20.20"
          }
        ]
      }
    },

    // copy task
    copy: {
      main: {
        files: [
          // flattens results to a single level
          {
            expand: true,
            flatten: true,
            src: [
                "Einkauf.js",
                "Geschaeft.js",
                "PmMiddleware.js",
                "PurchaseManager.js",
                "Zahler.js"
            ],
            dest: "<%=dir.build %>/",
            filter: "isFile"
          }
        ]
      }
    }, 

    //clean task
    clean: ["<%=dir.build %>/**/*"]
  });

  // load plugins
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-clean');

  // task(s).
  grunt.registerTask("build_local", ["clean", "copy", "replace:dbHost"]);
  grunt.registerTask("jenk_build", ["clean", "copy"]);
};
