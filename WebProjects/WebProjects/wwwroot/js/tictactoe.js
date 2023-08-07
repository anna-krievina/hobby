$(".ticCell").on("click", function () {
    if ($('#resultField').text().trim() != "") {
        return;
    }
    var self = $(this);
    if (self.text().trim() == "") {
        self.text("X");
        $.ajax({
            type: "POST",
            url: "/TicTacToe/Move",
            data: loadModelData(),
            success: function (response) {
                var cellId = "#cell" + response;
                $(cellId).css('color', 'white');
                $(cellId).css('border-color', 'black');
                $(cellId).text("O");
                $.ajax({
                    type: "POST",
                    url: "/TicTacToe/CalculateGameOver",
                    data: loadModelData(),
                    success: function (res) {
                        if (res == "end") {
                            $('#resultField').text("Game over!");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.responseText);
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError)
            {
                console.log(xhr.responseText);
            }
        });
    }
});
function loadModelData() {
    var ticTacModelArray = [];
    var idCounter = 0;
    $(".ticCell").each(function () {
        idCounter++;
        ticTacModelArray.push({
            Id: idCounter,
            Value: $(this).text()
        });
    });
    const modelData = {
        board: ticTacModelArray
    }
    return modelData;
}