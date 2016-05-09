define (
  ['underscore', 'jquery', 'backbone', 'localstorage'],
  function (_, $, Backbone) {
    var Task = Backbone.Model.extend({
      defaults:  {
        index: 0,
        name: 'no name',
        tags: [],
        stints: []
      },

      // Parse stringified date time data to Date object.
      parse: function (data, option) {
        data.stints = _.map(data.stints, function(value) {
          return {
            startTime: new Date(value.startTime),
            endTime: new Date(value.endTime),
            comment: value.comment
          };
        });

        delete data.currentStint;

        return data;
      },

      startStint: function () {
        var currentStint = {};
        currentStint.startTime = new Date();
        this.set({ currentStint: currentStint });
      },

      stopStint: function (comment) {
        if (!this.isStintStarted()) {
          console.log('Stint is not started.');
          return;
        }

        var currentStint = this.get('currentStint');
        currentStint.endTime = new Date();
        currentStint.comment = comment || '';
        this.set({ currentStint: currentStint });

        var stints = _.clone(this.get('stints'));
        stints.unshift(currentStint);
        this.set({ stints: stints })

        this.unset('currentStint');
      },

      discardStint: function () {
        this.unset('currentStint');
      },

      isStintStarted: function () {
        return this.get('currentStint');
      },

      summateStints: function () {
        var sum = _.reduce(this.get('stints'), function (sum, stint) {
          return sum + (stint.endTime.getTime() - stint.startTime.getTime());
        }, 0);

        if (this.get('currentStint')) {
          sum += Date.now() - this.get('currentStint').startTime.getTime();
        }

        return sum;
      }
    });

    var TaskList = Backbone.Collection.extend({
      localStorage: new Backbone.LocalStorage("Tasks"),
      localStorageReady: function (callback) {
        this.localStorage.ready(callback);
      },
      model: Task,
      comparator: 'index',

      reorder: function (ids) {
        _.each(ids, function (id, index) {
          this.find(function (m) {
            return m.get('id') == id;
          }).set({ index: index }).save();
        }, this);
      },

      stopAllStints: function () {
        this.each(function (task) {
          if (task.isStintStarted()) {
            task.stopStint();
            task.save();
          }
        });
      }
    });

    return {
      'Task': Task,
      'TaskList': TaskList
    }
  });
