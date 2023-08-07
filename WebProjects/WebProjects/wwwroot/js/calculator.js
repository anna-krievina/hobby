$(".calcButton").on("click", function () {
    var self = $(this);
    var buttonValue = self.val();
    var resultField = $('#resultField');
    // removing the zero otherwise 01 and the like would be displayed
    var resultFieldVal = resultField.val();
    if (resultFieldVal.length < 22) {
        switch (buttonValue) {
            case "+":
            case "-":
            case "*":
            case "÷":
                resultField.val(resultFieldVal + " " + buttonValue + " ");
                break;
            case "⌫":
                resultField.val(resultFieldVal.substring(0, resultFieldVal.length - 1));
                break;
            case "C":
                resultField.val("0");
                break;
            case "=":
                calculateResult(resultField.val(), resultField);
                break;
            // all the numbers
            default:
                resultField.val(resultFieldVal + buttonValue);
                break;
        }
    }
});

function calculateResult(resultFieldVal, resultField) {
    $.ajax({
        type: "POST",
        url: "/Calculator/Calculate",
        data: {
            result: resultFieldVal
        },
        success: function (response) {
            resultField.val(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
        }
    });
}