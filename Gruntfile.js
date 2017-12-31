module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    //constant
    dir: {
      build: "build",
      src: '.'
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
      main: {//productive task
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
      },
      firebase: {//dev env
        files: [
          {
            expand: true,
            cwd: '<%=dir.src %>/',
            src: [
              "firebase/**"
            ],
            dest: "<%=dir.build %>",
            filter: "isFile"
          }
        ]
      }, 
    },

    //clean task
    clean: ["<%=dir.build %>/**/*"],

    // watch task option
    watch: {
      scripts: {
        files: [
          "<%= dir.src %>/*.js"
        ],
        tasks: ["build_local", "copy:firebase", "execute"],
        options: {
          livereload: 35730,
        }
      }
    }, 

    // execute node script task
    execute: {
      target: {
        src: ["<%=dir.build %>/PmMiddleware.js"]
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-execute');

  // task(s).
      main_local: {
  grunt.registerTask("build_local", ["clean", "copy:main", "replace:dbHost"]);
  grunt.registerTask("jenk_build", ["clean", "copy:main"]);
  grunt.registerTask('local', function () {
    grunt.task.run('execute');
    grunt.task.run('watch');
	});
};
