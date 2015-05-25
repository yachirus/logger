define(['hogan'], function(Hogan) {
  var t = {
    /* jshint ignore:start */
    'movestintdialog' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div id=\"move-stint-dialog\" class=\"modal fade\" tabindex=\"-1\">");t.b("\n" + i);t.b("  <div class=\"modal-dialog modal-sm\">");t.b("\n" + i);t.b("    <div class=\"modal-content\">");t.b("\n" + i);t.b("      <div class=\"modal-header\">");t.b("\n" + i);t.b("        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>");t.b("\n" + i);t.b("        <h4 class=\"modal-title\" id=\"myModalLabel\">Move stint to...</h4>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"modal-body\">");t.b("\n" + i);t.b("        <div class=\"form-group clearfix\">");t.b("\n" + i);t.b("          <input type=\"text\" class=\"form-control\" name=\"target\">");t.b("\n" + i);t.b("          <span class=\"help-block\"></span>");t.b("\n" + i);t.b("        </div>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"modal-footer\">");t.b("\n" + i);t.b("        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>");t.b("\n" + i);t.b("        <button type=\"button\" class=\"btn btn-primary\" name=\"move\">Move</button>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'recordtask' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<td style=\"width: 50%\">");t.b("\n" + i);t.b("  <form name=\"task-name-tags\" class=\"form-inline\">");t.b("\n" + i);if(!t.s(t.f("inEdit",c,p,1),c,p,1,0,0,"")){t.b("    <p class=\"form-control-static\">");t.b("\n" + i);t.b("      <span style=\"margin-right: 10px;\">");t.b(t.v(t.f("name",c,p,0)));t.b("</span>");t.b("\n" + i);if(t.s(t.f("tags",c,p,1),c,p,0,198,258,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("      <span class=\"label label-default\">");t.b(t.v(t.d(".",c,p,0)));t.b("</span>");t.b("\n" + i);});c.pop();}t.b("    </p>");t.b("\n" + i);};if(t.s(t.f("inEdit",c,p,1),c,p,0,308,538,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <input type=\"text\" name=\"name\" class=\"form-control input-sm\" placeholder=\"Task name\" value=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);t.b("    <input type=\"text\" name=\"tags\" class=\"form-control input-sm\" placeholder=\"Tags\" value=\"");if(t.s(t.f("tags",c,p,1),c,p,0,516,522,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.d(".",c,p,0)));t.b(" ");});c.pop();}t.b("\">");t.b("\n" + i);});c.pop();}t.b("  </form>");t.b("\n" + i);t.b("</td>");t.b("\n" + i);t.b("<td>");t.b("\n" + i);t.b("  <form name=\"stint\" class=\"form-inline\">");t.b("\n" + i);t.b("    <p class=\"form-control-static duration\" style=\"margin-right: 4px;\">");t.b(t.v(t.f("duration",c,p,0)));t.b("</p>");t.b("\n" + i);if(t.s(t.f("isStintStarted",c,p,1),c,p,0,724,1161,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("    <div class=\"form-group\">");t.b("\n" + i);t.b("      <button type=\"button\" name=\"stop-stint\" class=\"btn btn-sm btn-success\">");t.b("\n" + i);t.b("        <span class=\"glyphicon glyphicon-stop\"></span>");t.b("\n" + i);t.b("      </button>");t.b("\n" + i);t.b("      <button type=\"button\" name=\"discard-stint\" class=\"btn btn-sm btn-danger\">");t.b("\n" + i);t.b("        <span class=\"glyphicon glyphicon-trash\"></span>");t.b("\n" + i);t.b("      </button>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <input type=\"text\" name=\"comment\" class=\"form-control input-sm\" placeholder=\"Comment\">");t.b("\n" + i);});c.pop();}if(!t.s(t.f("isStintStarted",c,p,1),c,p,1,0,0,"")){t.b("    <button type=\"button\" name=\"start-stint\" class=\"btn btn-sm btn-default\">");t.b("\n" + i);t.b("      <span class=\"glyphicon glyphicon-play\"></span>");t.b("\n" + i);t.b("    </button>");t.b("\n" + i);};t.b("  </form>");t.b("\n" + i);t.b("</td>");t.b("\n" + i);t.b("<td>");t.b("\n" + i);if(!t.s(t.f("inEdit",c,p,1),c,p,1,0,0,"")){t.b("  <div class=\"pull-right\">");t.b("\n" + i);t.b("  <button type=\"button\" name=\"edit-task\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-sm btn-default\">");t.b("\n" + i);t.b("    <span class=\"glyphicon glyphicon-pencil\"></span>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);t.b("  <button type=\"button\" name=\"remove-task\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-sm btn-danger\">");t.b("\n" + i);t.b("    <span class=\"glyphicon glyphicon-trash\"></span>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);};if(t.s(t.f("inEdit",c,p,1),c,p,0,1784,2133,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("  <div class=\"pull-right\">");t.b("\n" + i);t.b("  <button type=\"button\" name=\"edit-done\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-sm btn-success\">");t.b("\n" + i);t.b("    <span class=\"glyphicon glyphicon-ok\"></span>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);t.b("  <button type=\"button\" name=\"edit-cancel\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-sm btn-danger\">");t.b("\n" + i);t.b("    <span class=\"glyphicon glyphicon-remove\"></span>");t.b("\n" + i);t.b("  </button>");t.b("\n" + i);});c.pop();}t.b("</td>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'recordview' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"panel panel-default\" style=\"margin-top: 10px;\">");t.b("\n" + i);t.b("  <div class=\"panel-heading clearfix\">");t.b("\n" + i);t.b("    <button name=\"start-new-task\" type=\"button\" class=\"btn btn-primary pull-right\" aria-label=\"Add task\">Start new task</button>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <table class=\"table\">");t.b("\n" + i);t.b("  </table>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'summarytask' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"panel panel-default\">");t.b("\n" + i);t.b("  <div class=\"panel-heading clearfix\">");t.b("\n" + i);t.b("    <h4 class=\"panel-title cleafix\">");t.b("\n" + i);t.b("      <a data-toggle=\"collapse\" href=\"#");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("name",c,p,0)));t.b("\n" + i);t.b("      </a>");t.b("\n" + i);t.b("      ( Total ");t.b(t.v(t.f("totalTime",c,p,0)));t.b(" )");t.b("\n" + i);t.b("      <button type=\"button\" name=\"activate-task\" class=\"btn btn-xs btn-default pull-right\">");t.b("\n" + i);if(t.s(t.f("active",c,p,1),c,p,0,327,391,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <span class=\"glyphicon glyphicon-star\"></span>");t.b("\n" + i);});c.pop();}if(!t.s(t.f("active",c,p,1),c,p,1,0,0,"")){t.b("        <span class=\"glyphicon glyphicon-star-empty\"></span>");t.b("\n" + i);};t.b("        </button>");t.b("\n" + i);t.b("    </h4>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div id=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\" class=\"panel-collapse collapse in\">");t.b("\n" + i);t.b("    <table class=\"table\">");t.b("\n" + i);if(t.s(t.f("stints",c,p,1),c,p,0,639,2738,"{{ }}")){t.rs(c,p,function(c,p,t){if(t.s(t.f("visible",c,p,1),c,p,0,660,2719,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <tr>");t.b("\n" + i);t.b("          <td style=\"width: 60%;\">");t.b("\n" + i);if(!t.s(t.f("inEdit",c,p,1),c,p,1,0,0,"")){t.b("            <span style=\"margin-right: 20px;\">");t.b(t.v(t.f("startTime",c,p,0)));t.b(" ~ ");t.b(t.v(t.f("endTime",c,p,0)));t.b("</span> (");t.b(t.v(t.f("duration",c,p,0)));t.b(")");t.b("\n" + i);};if(t.s(t.f("inEdit",c,p,1),c,p,0,876,1225,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <form class=\"form-inline\">");t.b("\n" + i);t.b("              <input type=\"datetime-local\" name=\"start-time\" class=\"form-control input-sm\" value=\"");t.b(t.v(t.f("startTime",c,p,0)));t.b("\">");t.b("\n" + i);t.b("              <p class=\"form-control-static\"> ~ </p>");t.b("\n" + i);t.b("              <input type=\"datetime-local\" name=\"end-time\" class=\"form-control input-sm\" value=\"");t.b(t.v(t.f("endTime",c,p,0)));t.b("\">");t.b("\n" + i);t.b("            </form>");t.b("\n" + i);});c.pop();}t.b("          </td>");t.b("\n" + i);t.b("          <td>");t.b("\n" + i);if(!t.s(t.f("inEdit",c,p,1),c,p,1,0,0,"")){t.b("            ");t.b(t.v(t.f("comment",c,p,0)));t.b("\n" + i);};if(t.s(t.f("inEdit",c,p,1),c,p,0,1363,1473,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <input type=\"text\" name=\"comment\" class=\"form-control input-sm\" value=\"");t.b(t.v(t.f("comment",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("          </td>");t.b("\n" + i);t.b("          <td class=\"clearfix\">");t.b("\n" + i);t.b("            <div class=\"pull-right\">");t.b("\n" + i);if(!t.s(t.f("inEdit",c,p,1),c,p,1,0,0,"")){t.b("              <button type=\"button\" name=\"edit-stint\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-xs btn-default\">");t.b("\n" + i);t.b("                <span class=\"glyphicon glyphicon-pencil\"></span>");t.b("\n" + i);t.b("              </button>");t.b("\n" + i);t.b("              <button type=\"button\" name=\"move-stint\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-xs btn-default\">");t.b("\n" + i);t.b("                <span class=\"glyphicon glyphicon-share-alt\"></span>");t.b("\n" + i);t.b("              </button>");t.b("\n" + i);t.b("              <button type=\"button\" name=\"remove-stint\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-xs btn-danger\">");t.b("\n" + i);t.b("                <span class=\"glyphicon glyphicon-trash\"></span>");t.b("\n" + i);t.b("              </button>");t.b("\n" + i);};if(t.s(t.f("inEdit",c,p,1),c,p,0,2244,2650,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("              <button type=\"button\" name=\"edit-done\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-xs btn-success\">");t.b("\n" + i);t.b("                <span class=\"glyphicon glyphicon-ok\"></span>");t.b("\n" + i);t.b("              </button>");t.b("\n" + i);t.b("              <button type=\"button\" name=\"edit-cancel\" data-index=\"");t.b(t.v(t.f("index",c,p,0)));t.b("\" class=\"btn btn-xs btn-danger\">");t.b("\n" + i);t.b("                <span class=\"glyphicon glyphicon-remove\"></span>");t.b("\n" + i);t.b("              </button>");t.b("\n" + i);});c.pop();}t.b("            </div>");t.b("\n" + i);t.b("          </td>");t.b("\n" + i);t.b("        </tr>");t.b("\n" + i);});c.pop();}});c.pop();}t.b("    </table>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}),
    'summaryview' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"panel-group\" style=\"margin-top: 10px;\">");t.b("\n" + i);t.b("  <form class=\"form\">");t.b("\n" + i);t.b("    <div class=\"form-group\">");t.b("\n" + i);t.b("      <select class=\"form-control\">");t.b("\n" + i);t.b("        <option value=\"all\" selected>All</option>");t.b("\n" + i);t.b("        <option value=\"day\">Today</option>");t.b("\n" + i);t.b("        <option value=\"week\">This week</option>");t.b("\n" + i);t.b("        <option value=\"month\">This month</option>");t.b("\n" + i);t.b("        <option value=\"quarter\">This quarter</option>");t.b("\n" + i);t.b("        <option value=\"year\">This year</option>");t.b("\n" + i);t.b("      </select>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  </form>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }})
    /* jshint ignore:end */
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'movestintdialog' : r('movestintdialog'),
    'recordtask' : r('recordtask'),
    'recordview' : r('recordview'),
    'summarytask' : r('summarytask'),
    'summaryview' : r('summaryview')
  };
});