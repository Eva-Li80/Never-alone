using NeverAlone.InterfaceRepository;
using NeverAlone.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeverAlone.Models;
using Microsoft.AspNetCore.Identity;

namespace NeverAlone.Repository;

public class MoodRepository : IMoodRepository
{
    private readonly DataContext _context;
    public MoodRepository(DataContext context)
    {
        _context = context;

    }
    public async Task<MoodDTO> CreateMood(string id, int value)
    {
        Mood mood = new Mood { id = Guid.NewGuid().ToString(), userId = id, value = value, date = DateTime.Now };

        _context.Mood.Add(mood);
        await _context.SaveChangesAsync();

        MoodDTO moodDTO = new MoodDTO { value = mood.value, date = mood.date.ToString("yyyy-MM-dd") };

        return moodDTO;
    }

    public async Task<IEnumerable<MoodDTO>> GetAllMoods(string id)
    {
        var moods = await _context.Mood.Where(m => m.userId == id).ToListAsync();
        var returnItems = new List<MoodDTO>(moods.Select(m => new MoodDTO { value = m.value, date = m.date.ToString("yyyy-MM-dd") }).OrderBy(m => m.date).ToList());
        return returnItems;
    }
}