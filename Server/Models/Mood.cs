using Microsoft.AspNetCore.Identity;

namespace NeverAlone.Models;

public class Mood
{
    public string id { get; set; }
    public int value { get; set; }
    public string userId { get; set; }
    public DateTime date { get; set; }
    public IdentityUser user { get; set; }
}