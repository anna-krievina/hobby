$(".calcButton").on("click", function () {
    var self = $(this);
    var buttonValue = self.val();
    var resultField = $('#resultField');
    var resultFieldVal = resultField.val();
    // 22 is the length of maximum integer value
    if (resultFieldVal.length < 22) {
        switch (buttonValue) {
            case "+":
            case "-":
            case "*":
            case "÷":
                let calculations = ["+", "-", "*", "÷"];
                let index = -1;
                for (let i = 0; i < calculations.length; i++) {
                    index = resultFieldVal.indexOf(calculations[i]);
                    if (index > -1) {
                        resultFieldVal = resultFieldVal.replace(calculations[i], buttonValue);
                        resultField.val(resultFieldVal);
                        break;
                    }
                }
                if (index == -1) {
                    resultField.val(resultFieldVal + " " + buttonValue + " ");
                }
                break;
            case "⌫":
                // remove last character
                resultField.val(resultFieldVal.substring(0, resultFieldVal.length - 1));
                break;
            case "C":
                resultField.val("0");
                break;
            case "=":
                calculateResult(resultField.val(), resultField);
                break;
            case "+/-":
                negateResult(resultField.val(), resultField);
                break;
            // all the numbers
            default:
                resultFieldVal = resultFieldVal + buttonValue
                // removing the zero otherwise 01 and the like would be displayed
                if (resultFieldVal.length == 2 && resultFieldVal.startsWith("0")) {
                    resultFieldVal = resultFieldVal.substring(1, resultFieldVal.length);
                }
                resultField.val(resultFieldVal);
                break;
        }
    }
});

function calculateResult(resultFieldVal, resultField) {
    ajaxCall("/Calculator/Calculate", resultFieldVal, resultField);
}

function negateResult(resultFieldVal, resultField) {
    ajaxCall("/Calculator/NegateResult", resultFieldVal, resultField);
}

function ajaxCall(urlValue, resultFieldVal, resultField) {
    $.ajax({
        type: "POST",
        url: urlValue,
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