angular.module("frello",["xeditable","ui.bootstrap"]);

angular.module("frello").run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
