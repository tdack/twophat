#Two Phat Dacks theme

Symlink helpers.js to ghost root directory

eg:
    ln -sf content/themes/twophat/helpers.js helpers.js

Add the following to config.js:
    // Include any custom additions
    require('./helpers')();
