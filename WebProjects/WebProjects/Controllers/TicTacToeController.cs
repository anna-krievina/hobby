using com.sun.org.apache.bcel.@internal.generic;
using jdk.nashorn.@internal.ir;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using System.Reflection;
using WebProjects.Models;

namespace WebProjects.Controllers
{
    public class TicTacToeController : Controller
    {
        // GET: TicTacToeController
        public ActionResult Game()
        {
            TicGameBoard model = new TicGameBoard();
            var board = model.TicTacModels;
            var idCounter = 0;
            for (int i = 0; i < TicGameBoard.BoardSize; i++)
            {
                model.TicTacModels[i] = new TicTacModel();
                // made more sense to start at 0 and then increment before adding.
                model.TicTacModels[i].Id = ++idCounter;
            }
            return View(model);
        }

        [HttpPost("/TicTacToe/Move")]
        public string Move(TicTacModel[] board)
        {
            TicGameBoard model = new TicGameBoard()
            {
                TicTacModels = board
            };
            // first moves
            /*
             * the game board for tic tac toe that I'm working with is laid out like this:
             * 1|2|3
             * 4|5|6
             * 7|8|9
             */

            var returnId = "";
            TicTacModel[] result = new TicTacModel[TicGameBoard.winCombinationInner];
            for (int i = 0; i < TicGameBoard.winCombinationOuter; i++)
            {
                int nonEmptyCounter = 0;
                int xCounter = 0;
                int oCounter = 0;
                for (int j = 0; j < TicGameBoard.winCombinationInner; j++)
                {
                    result[j] = Array.Find(board, e => e.Id == model.winCombination[i, j]);
                    if (!string.IsNullOrEmpty(result[j].Value))
                    {
                        nonEmptyCounter++;
                        if (result[j].Value == "X")
                        {
                            xCounter++;
                        }
                        else if (result[j].Value == "O")
                        {
                            oCounter++;
                        }
                    }
                }
                if (nonEmptyCounter == 2 && (xCounter == 2 || oCounter == 2))
                {
                    for (int j = 0; j < TicGameBoard.winCombinationInner; j++)
                    {
                        result[j] = Array.Find(board, e => e.Id == model.winCombination[i, j]);
                        if (string.IsNullOrEmpty(result[j].Value))
                        {
                            returnId = result[j].Id.ToString();
                            break;
                        }
                    }
                }
                if (!string.IsNullOrEmpty(returnId))
                {
                    break;
                }
            }
            if (string.IsNullOrEmpty(returnId))
            {
                if (string.IsNullOrEmpty(board[4].Value))
                {
                    returnId = "5";
                }
                else if (string.IsNullOrEmpty(board[0].Value))
                {
                    returnId = "1";
                }
                else if (string.IsNullOrEmpty(board[8].Value))
                {
                    returnId = "9";
                }
                else if (string.IsNullOrEmpty(board[5].Value))
                {
                    returnId = "6";
                }
                else if (string.IsNullOrEmpty(board[3].Value))
                {
                    returnId = "4";
                }
            }
            return returnId;
        }

        [HttpPost("/TicTacToe/CalculateGameOver")]
        public string CalculateGameOver(TicTacModel[] board)
        {
            TicGameBoard model = new TicGameBoard()
            {
                TicTacModels = board
            };
            var returnId = "";
            TicTacModel[] result = new TicTacModel[TicGameBoard.winCombinationInner];
            for (int i = 0; i < TicGameBoard.winCombinationOuter; i++)
            {
                int xCounter = 0;
                int oCounter = 0;
                for (int j = 0; j < TicGameBoard.winCombinationInner; j++)
                {
                    result[j] = Array.Find(board, e => e.Id == model.winCombination[i, j]);
                    if (!string.IsNullOrEmpty(result[j].Value))
                    {
                        if (result[j].Value == "X")
                        {
                            xCounter++;
                        }
                        else if (result[j].Value == "O")
                        {
                            oCounter++;
                        }
                    }
                }
                if (Array.Find(board, e => string.IsNullOrEmpty(e.Value)) == null ||
                    (xCounter == 3 || oCounter == 3))
                {
                    // win condition, site.js ajax method interprets this as game over
                    returnId = "end";
                    break;
                }
            }
            return returnId;
        }
    }
}
