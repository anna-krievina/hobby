using java.util.concurrent;
using Microsoft.AspNetCore.Mvc;
using WebProjects.Models;

namespace WebProjects.Controllers
{
    public class CalculatorController : Controller
    {
        public IActionResult Game()
        {
            CalculatorModel model = new CalculatorModel();
            return View(model);
        }

        [HttpPost("/Calculator/Calculate")]
        public string Calculate(string result)
        {
            string[] resultArray = result.Split(' ');
            if (resultArray.Length == 3 )
            {
                try
                {
                    int calculationResult = 0;
                    int firstNumber = int.Parse(resultArray[0]);
                    int secondNumber = int.Parse(resultArray[2]);
                    int resultNumber = 0;
                    switch (resultArray[1])
                    {
                        case CalculatorModel.Add:
                            resultNumber = firstNumber + secondNumber;
                            break;
                        case CalculatorModel.Subtract:
                            resultNumber = firstNumber - secondNumber;
                            break;
                        case CalculatorModel.Divide:
                            resultNumber = firstNumber / secondNumber;
                            break;
                        case CalculatorModel.Multipy:
                            resultNumber = firstNumber * secondNumber;
                            break;
                    }
                    result = resultNumber.ToString();
                }
                catch (Exception e)
                {   
                    // in case of error, just return the result
                }
            }
            return result;
        }
        
        [HttpPost("/Calculator/NegateResult")]
        public string NegateResult(string result)
        {
            string[] resultArray = result.Split(' ');
            if (resultArray.Length > 0 )
            {
                    int firstNumber = int.Parse(resultArray[0]);
                    int resultNumber = 0 - firstNumber;
                    result = resultNumber.ToString();
            }
            return result;
        }
    }
}
