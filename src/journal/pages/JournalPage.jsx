import { useSelector } from "react-redux";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";
import { Loader } from '../../ui/Loader.jsx';
export const JournalPage = () => {

  const { activeNote, isSaving } = useSelector(state => state.journal);

  return (
    <JournalLayout>
      {isSaving
        ?
        <Loader />
        :
        activeNote !== null
          ?
          <NoteView />
          :
          <NothingSelectedView />
      }
    </JournalLayout>
  )
}
