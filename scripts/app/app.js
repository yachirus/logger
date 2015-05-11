define(
  ['underscore', 'jquery', 'bootstrap', 'app/model', 'app/recordview', 'app/summaryview'],
  function (_, $, bootstrap, model, recordview, summaryview) {
    taskList = new model.TaskList();

    // データのロード
    taskList.fetch().then(function(){
      // UIの構築
      recordView = new recordview.RecordView({
        el: $('#record-view'),
        model: taskList
      });
      
      summaryView = new summaryview.SummaryView({
        el: $('#summary-view'),
        model: taskList
      });
    });
  });
