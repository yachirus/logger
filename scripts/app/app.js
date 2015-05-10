define(
  ['underscore', 'jquery', 'bootstrap', 'app/model', 'app/recordview'],
  function (_, $, bootstrap, model, recordview) {
    taskList = new model.TaskList();

    // UIの構築
    recordView = new recordview.RecordView({
      el: $('#record-view'),
      model: taskList
    });
  });
