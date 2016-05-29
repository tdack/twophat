var hbs = require('express-hbs'),
    _ = require('lodash');

module.exports = function() {

    hbs.registerHelper('responsive', function(imageURL, options) {
      if (!imageURL) return;
      var responsive='sizes="(max-width: 1080px) 100vw, 1080px" srcset="';
      [640, 800, 1080].forEach(function(size){
        responsive += imageURL.replace(/\.[a-zA-z]{3}/g, function(x){return '_' + size + x;}) +', ';
      });
      responsive = responsive.slice(0,-2) +'"';
      return new hbs.handlebars.SafeString(responsive);
    });

    hbs.registerHelper('ct', function (options) {
      options = options || {};
      options.hash = options.hash || {};
      options.data = options.data || {};

        var self = this,
            data = hbs.handlebars.createFrame(options.data);

        // get the first match
        var re = /(-{3,}\n)/g,
            start = re.exec(self.markdown),
            end,
            head;

        // parse key: value
        var recipes = [];
        while (start && (end = re.exec(self.markdown)) ) {
            head = self.markdown.slice(start.index, end.index);
            var recipe = { 'ingredients': [] };
            head.split('\n')
                .forEach(function(line) {
                    var result = /([^:]+):(.*)/.exec(line);
                    if (result) {
                        if (result[1].trim() === 'title') {
                            recipe[result[1].trim()] = result[2].trim();
                        } else if (result[1].trim() === 'serves' || result[1].trim() === 'time') {
                            recipes[result[1].trim()] = result[2].trim();
                        } else {
                            recipe["ingredients"].push({
                                "name": result[1].trim(),
                                "quantity": result[2].trim()
                            })
                        }
                    }
                });
            recipes.push(recipe);
            start = end;
        }
        if (recipes.length) {
            // Call the main template function
            return options.fn({ recipes: recipes },
                { data: data,
                   blockParams: [ [recipes] ]
               });
        } else {
            // No ingredients
            return options.inverse(self, {
                data: data
            });
        }
    });
};
