define (
  ['underscore', 'backbone', 'moment', 'app/model', 'templates/templates'],
  function (_, Backbone, moment, model, t) {
    var SummaryView = Backbone.View.extend({

      events: {
      },

      initialize: function() {
        this.render();
      },

      render: function() {
        this.$el.html(t.summaryview());

        // Test code
        this.model.each(function (task) {
          var view = new TaskView({model: task});
          this.$el.find('div.panel-group').append(view.render().el);
        }, this);

        return this;
      },
    });

    var TaskView = Backbone.View.extend({
      className: 'panel panel-default',

      events: {
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        //this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function() {
        var totalTime = moment.duration();

        var task = _.mapObject(this.model.attributes, function(val, key) {
          if (key == 'stints') {
            return _.map(val, function(item, index) {
              var startMoment = moment(item.startTime);
              var endMoment = moment(item.endTime);
              var duration = moment.duration(item.endTime - item.startTime);

              totalTime.add(duration);

              return {
                startTime: startMoment.format('YYYY/M/D HH:mm:ss'),
                endTime: endMoment.format(startMoment.isSame(endMoment, 'day') ? 'HH:mm:ss' : 'YYYY/M/D HH:mm:ss'),
                duration: duration.humanize(),
                comment: item.comment
              };
            });
          } else {
            return val;
          }
        });
        _.extend(task, {totalTime: totalTime.humanize()});
        this.$el.html(t.summarytask(task));
        return this;
      }
    });

    return {
      'SummaryView': SummaryView,
    };
  });
