define (
  ['underscore', 'jquery', 'backbone'],
  function (_, $, Backbone) {
    var Task = Backbone.Model.extend({
      defaults:  {
        name: 'no name',
        tags: [],
        stints: []
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

        var stints = this.get('stints');
        stints.push(currentStint);
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
      model: Task,
      stopAllStints: function () {
        this.each(function (task) {
          if (task.isStintStarted()) {
            task.stopStint();
          }
        });
      }
    });

    return {
      'Task': Task,
      'TaskList': TaskList
    }
  });
