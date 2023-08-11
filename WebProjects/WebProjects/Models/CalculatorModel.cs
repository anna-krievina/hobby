namespace WebProjects.Models
{
    public class CalculatorModel
    {

        public const string Add = "+";
        public const string Subtract = "-";
        public const string Multipy = "*";
        public const string Divide = "÷";
        public const string Undo = "⌫";
        public const string Reset = "C";
        public const string Result = "=";
        public const string Negate = "+/-";

        public string[] Operation = { Add, Subtract, Multipy, Divide };
        public string[] Action = { Undo, Reset, Result };
    }
}
