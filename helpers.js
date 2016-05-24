var hbs = require('express-hbs'),
    _   = require('lodash');

module.exports = function() {

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

       if (start) {
         end = re.exec(self.markdown);
       }

       if (start && end) {
         head = self.markdown.slice(start.index, end.index);
         try {
           // parse key: value
           var recipe = {"ingredients": []};
           head.split('\n').forEach(function(line) {
             var result = /([^:]+):(.*)/.exec(line);
             if (result) {
               if (result[1].trim() === 'title' || result[1].trim() === 'serves' || result[1].trim() === 'time') {
                 recipe[result[1].trim()] = result[2].trim();
               } else {
                 recipe["ingredients"].push({
                   "name": result[1].trim(),
                   "quantity": result[2].trim()
                 })
               }
             }
           });

           // Call the main template function
           return options.fn({recipe: recipe}, {
               data: data,
               blockParams: [[recipe]]
           });
         } catch (e) {
           // No ingredients found, call the inverse or `{{else}}` function
           return options.inverse(self, {data: data});
         }
       } else {
         return options.inverse(self, {data: data});
       }
  });
};
