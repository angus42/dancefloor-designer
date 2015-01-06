angular.module('myApp', ['ui.sortable', 'angularSpectrumColorpicker'])
.controller('Ctrl', function ($scope) {
    $scope.selected_step = null;
    $scope.selected_color = null;
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

    $scope.setColor = function (element, row, index) {
        if (!$scope.selected_color)
            return;
        row[index] = angular.copy($scope.selected_color);
    }

    $scope.addStep = function () {
        var steps = $scope.data.steps;
        var newStep = angular.copy($scope.data.steps[0]);
        for (y = 0; y < newStep.frame.length; y++) {
            for (x = 0; x < newStep.frame[y].length; x++) {
                newStep.frame[y][x] = "#000";
            }
        }
        steps.push(newStep);
        $scope.data.steps = steps;
    }

    $scope.copyStep = function () {
        if (!$scope.selected_step)
            return;
        var steps = $scope.data.steps;
        steps.push(angular.copy($scope.selected_step));
        $scope.data.steps = steps;
    }
});