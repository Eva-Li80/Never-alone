using System.ComponentModel.DataAnnotations;

namespace NeverAlone.Models.RequestModels;

public class MoodCreate
{
    [Required]
    public int value { get; set; }
}