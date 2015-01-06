angular.module('myApp', ['ui.sortable', 'angularSpectrumColorpicker'])
.controller('Ctrl', function ($scope) {
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

    $scope.newSequence = function () {
        alert("Not yet implemented!");
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
        var index = steps.indexOf($scope.selected_step);
        $scope.selected_step = null;
        steps.splice(index, 1);        
    };

    $scope.togglePlayStop = function () {
        alert("Not yet implemented!");
    };

});