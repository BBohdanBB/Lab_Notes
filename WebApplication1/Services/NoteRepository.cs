using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class NoteRepository
    {
        private DatabaseContext _db;

        public NoteRepository()
        {
            _db = new DatabaseContext();
        }

        public Note[] FindAll()
        {
            return _db.Notes.ToArray();
        }

        public async Task<int> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            Note note = _db.Notes.FirstOrDefault(n => n.Id == id);
            if (note != null)
            {
                _db.Notes.Remove(note);
            }

            return await _db.SaveChangesAsync(cancellationToken);
        }

        public Note FindById(int id)
        {
            return _db.Notes.FirstOrDefault(n => n.Id == id);
        }

        public async Task<Note> CreateAsync(string title, string text, CancellationToken cancellationToken)
        {
            var utcDateTime = DateTime.UtcNow;
            Note note = new Note
            {
                Title = title,
                Text = text,
                Ctreated = utcDateTime,
                LastModifaed = utcDateTime
            };

            var entry = _db.Notes.Add(note);
            await _db.SaveChangesAsync(cancellationToken);
            return entry.Entity;
        }

        public async Task<Note> UpdateAsync(int id, string title, string text, CancellationToken cancellationToken)
        {
            Note note = _db.Notes.FirstOrDefault(n => n.Id == id);
            if (note != null)
            {
                note.Text = text;
                note.Title = title;
                note.LastModifaed = DateTime.UtcNow;
                await _db.SaveChangesAsync(cancellationToken);
                return note;
            }
            else
            {
                return await CreateAsync(title, text, cancellationToken);
            }
        }
    }
}
