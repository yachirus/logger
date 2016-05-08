define(
  ['underscore', 'jquery', 'bootstrap', 'typeahead', 'app/model', 'app/recordview', 'app/summaryview'],
  function (_, $, bootstrap, typeahead, model, recordview, summaryview, t) {
    taskList = new model.TaskList();

    // UIの構築
    recordView = new recordview.RecordView({
      el: $('#record-view'),
      model: taskList
    });

    summaryView = new summaryview.SummaryView({
      el: $('#summary-view'),
      model: taskList
    });

    // データのロード
    taskList.localStorageReady(function () {
      taskList.fetch({reset: true});
    });
  });
