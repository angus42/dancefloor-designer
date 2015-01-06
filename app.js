angular.module('myApp', ['ui.sortable', 'angularSpectrumColorpicker'])
.controller('Ctrl', ['$scope', '$interval',
      function($scope, $interval) {
    $scope.selected_step = null;
    $scope.selected_color = null;
    $scope.data = {
        name: "Unnamed",
        steps: [
            {
                frame: [
                    [{ v: "#f00" }, { v: "#0f0" }, { v: "#00f" }],
                    [{ v: "#f80" }, { v: "#0f8" }, { v: "#08f" }],
                    [{ v: "#ff0" }, { v: "#0ff" }, { v: "#f0f" }]
                ]
            }
        ]
    };

    var animationToken;

    $scope.newSequence = function (width, height) {
        var firstFrame = new Array();
        for (y = 0; y < height; y++) {
            var row = new Array();
            firstFrame.push(row);
            for (x = 0; x < width; x++) {
                row.push({ v: "#000" });
            }
        }
        $scope.$apply(function ($scope) {            
            $scope.selected_step = null;
            $scope.data.name = "Unnamed";
            $scope.data.steps = [
                {
                    frame: firstFrame
                }
            ];
        });
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

    $scope.exportToC = function () {
        alert("Not yet implemented!");
    };

    $scope.selectStep = function (step) {
        $scope.selected_step = step;
    }

    $scope.setColor = function (element, row, index) {
        if (!$scope.selected_color)
            return;
        row[index].v = angular.copy($scope.selected_color);
    }

    $scope.addStep = function () {
        var steps = $scope.data.steps;
        var newStep = angular.copy($scope.data.steps[0]);
        for (y = 0; y < newStep.frame.length; y++) {
            for (x = 0; x < newStep.frame[y].length; x++) {
                newStep.frame[y][x].v = "#000";
            }
        }
        steps.push(newStep);
    }

    $scope.copyStep = function () {
        if (!$scope.selected_step)
            return;
        var steps = $scope.data.steps;
        steps.push(angular.copy($scope.selected_step));
    }

    $scope.removeStep = function () {
        if (!$scope.selected_step)
            return;
        var steps = $scope.data.steps;
        if (steps.length == 1)
            return;
        var index = steps.indexOf($scope.selected_step);
        steps.splice(index, 1);
        if (index >= steps.length)
            $scope.selected_step = steps[index - 1];
        else
            $scope.selected_step = steps[index];
    };

    $scope.stopAnimation = function () {
        if (angular.isDefined(animationToken)) {
            $interval.cancel(animationToken);
            animationToken = undefined;
        }
    }

    $scope.playAnimation = function () {
        if (angular.isDefined(animationToken)) {
            $scope.stopAnimation()
        }
        var delay = $("#animationSpeedSlider").slider("value");
        animationToken = $interval(function () {
            var steps = $scope.data.steps;
            var index = steps.indexOf($scope.selected_step);
            index++;
            if (index >= steps.length)
                index = 0;
            $scope.selected_step = steps[index];
        }, delay);
    }

    $scope.togglePlayStop = function () {
        if (angular.isDefined(animationToken)) {
            $scope.stopAnimation()
        }
        else {
            $scope.playAnimation();
        }
    };

}]);