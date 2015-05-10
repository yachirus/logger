define (
  ['underscore', 'backbone', 'moment','app/model', 'templates/templates'],
  function (_, Backbone, moment, model, t) {
    var RecordView = Backbone.View.extend({

      events: {
        'click button[name=start-new-task]': 'startNewTask',
      },

      initialize: function () {
        this.listenTo(this.model, 'stop-all-stints', this.stopAllStints);
        this.listenTo(this.model, 'sync', this.render);
        this.model.fetch();
      },

      render: function () {
        this.$el.html(t.recordview());

        // Test code
        this.model.each(function (task) {
          var view = new TaskView({model: task});
          this.$el.find('ul').append(view.render().el);

          if (task.isStintStarted()) {
            view.countup();
          }
        }, this);

        return this;
      },

      stopAllStints: function () {
        this.model.stopAllStints();
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
          name: ('New Task' + (suffixNumber ? (' ' + suffixNumber) : '')),
          tags: [],
          stints: []
        });

        this.model.unshift(newTask);
        newTask.save();

        newTask.startStint();
        this.render();
      }
    });

    var TaskView = Backbone.View.extend({
      tagName: 'li',
      className: 'list-group-item',

      events: {
        'submit [name=task-name]': function() { this.endEditTaskName(); return false; },
        'submit [name=tags]': function () { this.addTags(); return false; },
        'submit [name=stint]': function () { this.stopStint(); return false; },
        'click .task-name': 'beginEditTaskName',
        'click span.remove-tag': 'removeTag',
        'click button[name=start-stint]': 'startStint',
        'click button[name=stop-stint]': 'stopStint',
        'click button[name=discard-stint]': 'discardStint',
      },

      initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
      },

      render: function () {
        var formatString = this.formatSummation(this.model.summateStints());
        this.$el.html(t['record'](_.extend(
          {
            duration: formatString,
            isStintStarted: this.model.isStintStarted(),
          },
          this.model.attributes)));
        return this;
      },

      beginEditTaskName: function() {
        var el = Backbone.$('<input type="text" class="form-control input-sm" placeholder="Task name">');
        el.val(this.model.get('name'));
        this.$el.find('form[name=task-name] div').html(el);
      },

      endEditTaskName: function() {
        var newName = this.$el.find('form[name=task-name] input').val();
        this.model.set({name: newName});
        this.model.save();
        this.render();
      },

      addTags: function () {
        var tagsString = this.$('input[name=tags]').val();
        var tags = this.model.get('tags').concat(tagsString.split(' '));
        tags = _.uniq(tags);
        this.model.set({ tags: tags });
        this.model.save();
      },

      removeTag: function (event) {
        var tagRemoving = this.$(event.target).attr('data-tag-name');
        var tags = _.without(this.model.get('tags'), tagRemoving);
        this.model.set({ tags: tags });
        this.model.save();
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
        this.model.collection.trigger('stop-all-stints');

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
      'RecordView': RecordView,
      'TaskView': TaskView,
    };
  });
