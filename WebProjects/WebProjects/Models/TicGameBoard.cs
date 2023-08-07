using com.sun.org.apache.xml.@internal.resolver.helpers;

namespace WebProjects.Models
{
    public class TicGameBoard
    {
        /*
         * the game board for tic tac toe that I'm working with is laid out like this:
         * 1|2|3
         * 4|5|6
         * 7|8|9
         */
        public const int BoardSize = 9;
        public const int BoardArraySize = 3;
        public const int winCombinationOuter = 8;
        public const int winCombinationInner = 3;
        public int[,] winCombination = {  { 1, 5, 9 }, { 3, 5, 7 }, { 1, 2, 3 }, { 4, 5, 6 },
        { 7, 8, 9 }, {1, 4, 7 }, { 2, 5, 8 }, {3, 6, 9} };
        public TicTacModel[] TicTacModels = new TicTacModel[9];        
    }
}
