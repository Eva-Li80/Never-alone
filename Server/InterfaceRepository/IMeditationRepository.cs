using NeverAlone.Models;

namespace NeverAlone.InterfaceRepository
{

    public interface IMeditationRepository
    {
        public Task<Meditation> CreateMeditation(Meditation meditation);
        public Task<bool> DeleteMeditation(int id);

        public Task<IEnumerable<Meditation>> GetAllMeditations();

        public Task<Meditation> GetMeditationById(int id);
    }
}