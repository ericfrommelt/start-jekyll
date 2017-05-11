var paths = {};

// Main Directories
paths.devDir              = '_dev/';    // Gulp processes these files
paths.jekyllDir           = '';     // Jekyll processes these files
paths.siteDir             = '_site/';  // Static site files

paths.postsDir      = '_posts';
paths.draftsDir     = '_drafts';
paths.imageDir      = 'img';
paths.scriptsDir    = 'scripts';
paths.stylesDir     = 'styles';

// Dev file locations
paths.devSassFiles    = paths.devDir + paths.stylesDir;
paths.devJsFiles      = paths.devDir + paths.scriptsDir;
paths.devImageFiles   = paths.devDir + paths.imageDir;


// Jekyll file locations
paths.jekyllCssFiles = paths.jekyllDir + paths.stylesDir;

// Site file locations
paths.siteCssFiles = paths.siteDir + paths.stylesDir;
paths.siteImageFiles = paths.siteDir + paths.imageDir;
paths.siteScriptFiles = paths.siteDir + paths.scriptsDir;

// Glob patterns
paths.sassPattern = '/**/*.scss';
paths.jsPattern = '/**/*.js';

module.exports = paths;
