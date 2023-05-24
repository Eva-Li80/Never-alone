using NeverAlone.Models;

namespace NeverAlone.InterfaceRepository
{
    public interface IMoodRepository
    {
        public Task<MoodDTO> CreateMood(string id, int value);
        public Task<IEnumerable<MoodDTO>> GetAllMoods(string id);
    }
}