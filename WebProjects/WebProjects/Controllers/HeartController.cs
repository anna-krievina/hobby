using Microsoft.AspNetCore.Mvc;

namespace WebProjects.Controllers
{
    public class HeartController : Controller
    {
        public IActionResult Game()
        {
            return View();
        }
    }
}
