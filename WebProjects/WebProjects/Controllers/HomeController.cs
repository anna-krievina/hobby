using Microsoft.AspNetCore.Mvc;

namespace WebProjects.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult About()
        {
            return View();
        }
    }
}
