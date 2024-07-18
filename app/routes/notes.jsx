// localhost:3000/notes

import { redirect } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "../components/data/notes";
import NewNote, { links as newNoteStyles } from "../components/NewNote";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // Add Validation

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteStyles()];
}
