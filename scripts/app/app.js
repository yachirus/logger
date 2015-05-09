define(
  ['underscore', 'jquery', 'bootstrap', 'app/model', 'app/recordview'],
  function (_, $, bootstrap, model, recordview) {
    taskList = new model.TaskList();

    var task = new  model.Task({
      name: 'Task 1',
      tags: ['tag-1', 'tag-2'],
      stints: [{
        startTime: new Date(),
        endTime: new Date(Date.now() + 350 * 1000)}]
    });
    taskList.add([task]);

    task = new  model.Task({
      name: 'Task 2',
      tags: ['tag-a', 'tag-b'],
      stints: [{
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 1000)}]
    });
    taskList.add([task]);

    // UIの構築
    recordView = new recordview.RecordView({
      el: $('#record-view'),
      model: taskList
    });
  });
