using Microsoft.AspNetCore.Mvc;

namespace WebProjects.Controllers
{
    public class SakuraController : Controller
    {
        public IActionResult Game()
        {
            return View();
        }
    }
}
