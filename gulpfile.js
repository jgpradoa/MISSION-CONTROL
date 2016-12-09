var gulp  = require('gulp'), //task runner
    gutil = require('gulp-util'); //gulp logger
    shell = require('gulp-shell') //to execute npm scripts

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});


gulp.task('testWatcher', shell.task([
										  'echo starting integration testing',
										  'npm run integration',
										  'echo integration testing ended'
										]));