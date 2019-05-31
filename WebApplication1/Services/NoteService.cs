using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class NoteService
    {
        NoteRepository _noteRepository;

        public NoteService()
        {
            _noteRepository = new NoteRepository();
        }

        public ICollection<Note> FindAll()
        {
            return _noteRepository.FindAll();
        }

        public async Task<Note> CreateAsync(string title, string text, CancellationToken cancellationToken)
        {
            if (String.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentNullException(nameof(title));
            }
            if (string.IsNullOrWhiteSpace(text))
            {
                throw new ArgumentNullException(nameof(text));
            }

            return await _noteRepository.CreateAsync(title, text, cancellationToken);
        }

        public async Task<Note> UpdateAsync(int id, string title, string text, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                throw new ArgumentNullException(nameof(title));
            }
            if (string.IsNullOrWhiteSpace(text))
            {
                throw new ArgumentNullException(nameof(text));
            }

            return await _noteRepository.UpdateAsync(id, title, text, cancellationToken);
        }

        public async Task<int> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            return await _noteRepository.DeleteAsync(id, cancellationToken);
        }

        public Note FindById(int id)
        {
            return _noteRepository.FindById(id);
        }
    }

}
