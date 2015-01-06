angular.module('myApp', ['ui.sortable'])
.controller('Ctrl', function ($scope) {
    $scope.selected_step = null;
    $scope.data = {
        name: "Unnamed",
        steps: [
            {
                frame: [
                    ["#f00", "#0f0", "#00f"],
                    ["#f80", "#0f8", "#08f"],
                    ["#ff0", "#0ff", "#f0f"]
                ]
            },
            {
                frame : [
                    ["#f00", "#0f0", "#00f"],
                    ["#f80", "#0f8", "#08f"],
                    ["#ff0", "#0ff", "#f0f"]
                ]
            }]
    };

    $scope.load = function (element) {
        var reader = new FileReader();
        reader.onload = function () {
            $scope.$apply(function ($scope) {
                $scope.data = JSON.parse(reader.result);
            });
        };
        reader.readAsText(element.files[0]);
    };

    $scope.save = function () {
        var blob = new Blob([JSON.stringify($scope.data)], { type: "text/json;charset=utf-8" });
        saveAs(blob, $scope.data.name + ".dfs");
    };

    $scope.selectStep = function (step) {
        $scope.selected_step = step;
    }

    $scope.newStep = function () {
        var steps = $scope.data.steps;
        steps.push(angular.copy($scope.selected_step));
        $scope.data.steps = steps;
    }
});