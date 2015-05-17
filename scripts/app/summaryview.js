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
        'click button[name=move-stint]': 'moveStint',
        'click button[name=edit-stint]': 'beginEditStint',
        'click button[name=remove-stint]': 'removeStint',
        'click button[name=edit-done]': 'endEditStint',
        'click button[name=edit-cancel]': 'render'
      },

      initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        //this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function(options) {
        var totalTime = moment.duration();

        var task = _.mapObject(this.model.attributes, function(val, key) {
          if (key == 'stints') {
            return _.map(val, function(item, index) {
              var startMoment = moment(item.startTime);
              var endMoment = moment(item.endTime);
              var duration = moment.duration(item.endTime - item.startTime);
              var inEdit = options ? (options.editIndex == index ? true : false) : false;

              var formatStringStart = formatStringEnd = "YYYY-MM-DDTHH:mm:ss";
              if (!inEdit) {
                formatStringStart = 'YYYY/M/D HH:mm:ss';
                formatStringEnd = startMoment.isSame(endMoment, 'day') ? 'HH:mm:ss' : 'YYYY/M/D HH:mm:ss';
              }
              totalTime.add(duration);

              return {
                index: index,
                inEdit: inEdit,
                startTime: startMoment.format(formatStringStart),
                endTime: endMoment.format(formatStringEnd),
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

      beginEditStint: function(event) {
        var index = Backbone.$(event.currentTarget).attr('data-index');
        this.render({editIndex: index});
      },

      endEditStint: function(event) {
        var index = Backbone.$(event.currentTarget).attr('data-index');
        var stints = _.chain(this.model.get('stints'))
        .clone().map(function(item) {
          return _.clone(item);
        }).value();

        var startTime = Backbone.$('input[name=start-time]').val();
        var endTime = Backbone.$('input[name=end-time]').val();
        var comment = Backbone.$('input[name=comment]').val();

        stints[index].startTime = moment(startTime).toDate();
        stints[index].endTime = moment(endTime).toDate();
        stints[index].comment = comment;

        if (_.isEqual(stints, this.model.get('stints'))) {
          this.discardEditStint();
        } else {
          stints = _.sortBy(stints, function(item) {
            return -1 * item.startTime.getTime();
          });
          this.model.set({ 'stints': stints });
          this.model.save();
        }
      },

      discardEditStint: function() {
        this.render();
      },

      moveStint: function(event) {
        var dialog = Backbone.$(t.movestintdialog());
        dialog.on('hidden.bs.modal', function () {
          dialog.remove();
        })

        var model = this.model;
        dialog.find('button[name=move]').on('click', function (e) {
          var targetName = dialog.find('input[name=target]').val();
          var target = model.collection.find(function(item) {
            return item.get('name') == targetName;
          });

          if (target) {
            var index = Backbone.$(event.currentTarget).attr('data-index');
            var stints = _.clone(model.get('stints'));
            var stint = stints.splice(index, 1)[0];
            model.set({ 'stints': stints });
            model.save();

            var targetStints = _.clone(target.get('stints'));
            targetStints.push(stint);
            targetStints = _.sortBy(targetStints, function(item) {
              return -1 * item.startTime.getTime();
            });

            target.set({ 'stints': targetStints });
            target.save();

            dialog.modal('hide');
          } else {
            dialog.find('.form-group').addClass('has-error');
            dialog.find('span.help-block').text('Task "' + targetName + '" is not found.');
          }
        })

        /*dialog.find('input').typeahead({}, {
          source: function() { return ['hoge', 'fuga']; }
        });*/

        Backbone.$('body').append(dialog);
        Backbone.$('#move-stint-dialog').modal();
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
