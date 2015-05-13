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
        'click button[name=edit-stint]': 'startEditStint',
        'click button[name=remove-stint]': 'removeStint'
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
                index: index,
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
      },

      removeStint: function(event) {
        var index = Backbone.$(event.currentTarget).attr('data-index');
        var stints = _.clone(this.model.get('stints'));
        stints.splice(index, 1);
        this.model.set({ 'stints': stints });
        this.model.save();
      }
    });

    return {
      'SummaryView': SummaryView,
    };
  });
