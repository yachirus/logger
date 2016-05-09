define (
  ['underscore', 'backbone', 'jqueryui', 'moment','app/model', 'templates/templates'],
  function (_, Backbone, jqueryui, moment, model, t) {
    var RecordView = Backbone.View.extend({

      events: {
        'click button[name=start-new-task]': 'startNewTask',
      },

      initialize: function () {
        this.$el.html(t.recordview());

        var self = this;
        this.$el.find('#record-list').sortable({
          update: function(ev, ui) {
            self.model.reorder(self.$el.find('#record-list').sortable("toArray"));
          }
        });

        this.listenTo(this.model, 'add', this.add);
        this.listenTo(this.model, 'reset', this.reset);
      },

      add: function(task) {
        var view = new TaskView({model: task});
        this.$el.find('#record-list').prepend(view.render().el);

        if (task.isStintStarted()) {
          view.countup();
        }
      },

      reset: function() {
        this.model.each(function (task) {
          var view = new TaskView({model: task});
          this.$el.find('#record-list').append(view.render().el);
        }, this);
      },

      startNewTask: function () {
        this.model.stopAllStints();

        // Finding a unique task name;
        var suffixNumber = 0;
        while (true) {
          var candidate = ('New Task' + (suffixNumber ? (' ' + suffixNumber) : ''));
          if (!this.model.find(function (task) { return (task.get('name') == candidate); })) {
            break;
          };

          suffixNumber += 1;
        }

        var newTask = new model.Task({
          active: true,
          name: ('New Task' + (suffixNumber ? (' ' + suffixNumber) : '')),
          tags: [],
          stints: []
        });

        newTask.startStint();
        this.model.unshift(newTask);
        newTask.save();
      }
    });

    var TaskView = Backbone.View.extend({
      tagName: 'tr',

      events: {
        'click button[name=edit-task]': 'beginEditTask',
        'click button[name=edit-done]': function () { this.endEditTask(true); },
        'click button[name=edit-cancel]': function () { this.endEditTask(false); },
        'click button[name=archive-task]': 'archiveTask',
        'click button[name=remove-task]': 'removeTask',
        'keydown form[name=task-name-tags] input': 'keyDown',
        'click button[name=start-stint]': 'startStint',
        'click button[name=stop-stint]': 'stopStint',
        'click button[name=discard-stint]': 'discardStint',
        'submit [name=stint]': function () { this.stopStint(); return false; },
      },

      initialize: function () {
        this.$el.attr({ id: this.model.id });

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function (options) {
        if (this.model.get('active')) {
          var formatString = this.formatSummation(this.model.summateStints());

          options = _.extend({
            duration: formatString,
            isStintStarted: this.model.isStintStarted(),
          }, options);

          this.$el.html(t['recordtask'](_.extend(options, this.model.attributes)));
          this.$el.show();
        } else {
          this.$el.hide();
        }
        return this;
      },

      beginEditTask: function() {
        this.render({inEdit: true});
      },

      endEditTask: function(done) {
        if (done) {
          var name = this.$el.find('input[name=name]').val();

          var tagsString = this.$('input[name=tags]').val();
          var tags = tagsString.split(' ');
          tags = _.chain(tags).uniq().compact().value();

          this.model.set({
            name: name,
            tags: tags
          });
          this.model.save();
        }
        this.render();
      },

      removeTask: function() {
        this.model.destroy();
      },

      archiveTask: function () {
        this.model.set('active', false);
        this.model.save();
      },

      keyDown: function(event) {
        switch (event.keyCode)
        {
          case 13:
            // Enter
            this.endEditTask(true);
            break;
          case 27:
            // Escape
            this.endEditTask(false);
            break;
          default:
            break;
        }
      },

      formatSummation: function(summation){
        var duration = moment.duration(summation);
        var formatString = duration.hours() + ':';
        formatString += duration.minutes() + ':';
        formatString += duration.seconds();
        return formatString
      },

      countup: function () {
        // Start interval update
        var ctx = this;
        var update = function () {
          var formatString = ctx.formatSummation(ctx.model.summateStints());
          ctx.$el.find('.duration').text(formatString);
          if (ctx.model.isStintStarted()) {
            setTimeout(update, 1000);
          }
        }
        setTimeout (update,1000);
      },

      startStint: function () {
        this.model.collection.stopAllStints();

        // Start a new stint
        this.model.startStint();
        this.countup();
      },

      stopStint: function () {
        var comment = this.$el.find('input[name=comment]').val();
        this.model.stopStint(comment);
        this.model.save();
      },

      discardStint: function () {
        this.model.discardStint();
      }
    });

    return {
      'RecordView': RecordView
    };
  });
