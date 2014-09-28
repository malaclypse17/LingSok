module.exports = function (grunt) {
    "use strict";

    // load all grunt tasks

    grunt.initConfig({
        wiredep: {
            target: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'app/**/*.html',
                  'index.html',   // .html support...
                  'app/views/**/*.jade',   // .jade support...
                  'app/styles/main.scss',  // .scss & .sass support...
                  'app/config.yml'         // and .yml & .yaml support out of the box!
                ],

                // Optional:
                // ---------
                options: {
                    cwd: '',
                    dependencies: true,
                    devDependencies: false,
                    exclude: [],
                    fileTypes: {},
                    ignorePath: '',
                    overrides: {}
                }
            }
        },
        ts: {
            options: {                    // use to override the default options, See : http://gruntjs.com/configuring-tasks#options
                target: 'es3',            // es3 (default) / or es5
                module: 'amd',       // amd (default), commonjs
                sourcemap: true,          // true  (default) | false
                declaration: false,       // true | false  (default)
                nolib: false,             // true | false (default)
                comments: false           // true | false (default)
            },
            dev: {                          // a particular target   
                src: ["**/*.ts"], // The source typescript files, See : http://gruntjs.com/configuring-tasks#files                
                watch: 'ts',         // If specified, configures this target to watch the specified director for ts changes and reruns itself.
                out: 'dev',
                options: {                  // override the main options, See : http://gruntjs.com/configuring-tasks#options
                    sourcemap: true
                },
            },
            live: {                          // a particular target   
                src: ["**/*.ts"], // The source typescript files, See : http://gruntjs.com/configuring-tasks#files                
                watch: 'ts',         // If specified, configures this target to watch the specified director for ts changes and reruns itself.
                out: 'scripts/app.js',
                options: {                  // override the main options, See : http://gruntjs.com/configuring-tasks#options
                    sourcemap: false
                },
            },
        },
    });
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);

};