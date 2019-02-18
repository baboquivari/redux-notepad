import { editorInput } from "../actions/actions";


const initialState = {
    notes: [],
    editorInput: '',
    editorSelected: false,
    lineNumber: 0,
    selectedNoteIndex: 0,
    newNoteButtonClicked: false,
    searchBarInput: '',
    
}

function notesReducer (prevState = initialState, action) {
    switch (action.type) {
        case 'SELECT_NOTE': 
            return { ...prevState,  ...{ 
                selectedNoteIndex: action.index,
                editorInput: prevState.notes ? prevState.notes[action.index].content : ''
                } 
            }

        case 'UPDATE_EDITOR': 
            if (action.value === 'clear') {
                return { ...prevState,  ...{ 
                    editorInput: '',
                    notes: notes || prevState.notes,
                    lineNumber: action.line                    
                }}
            }
                     
            if (prevState.notes.length) {
                var notes = prevState.notes.slice();
                var title;
                var subtitle;
                var content;
    
                switch (action.line) {
                    case 1:
                        title = action.value.split('\n')[0]
                        break;
                    default:
                        content = action.value.replace(/↵/g, ' ');
                        subtitle = content.slice(notes[prevState.selectedNoteIndex].title.length)

                        if (subtitle.length > 15) {
                            subtitle = subtitle.slice(0, 17) + '...';
                        }
                    }
    
                notes[prevState.selectedNoteIndex].title = title || notes[prevState.selectedNoteIndex].title;
                notes[prevState.selectedNoteIndex].subtitle = subtitle || notes[prevState.selectedNoteIndex].subtitle || '';
                notes[prevState.selectedNoteIndex].content = content || action.value;

                return { ...prevState,  ...{ 
                    editorInput: action.value,
                    notes: notes || prevState.notes             
                }}
            }

        case 'HANDLE_EDITOR_CLICK': 
            return { ...prevState, ...{ editorSelected: true } }

        case 'SAVE_NOTE': 
            var res = prevState.notes.concat(action.value);
            return { ...prevState, ...{ notes: res, newNoteButtonClicked: true } };

        case 'ADD_NEW_NOTE': 
            // check if there's already a 'New Note' loaded in the state and return prevState if true
            if (prevState.notes[0] && prevState.notes[0].title === 'New Note') {
                return { ...prevState, ...{newNoteButtonClicked: true}};
            }

            var res = prevState.notes.slice();
            res.unshift({title: 'New Note', content: '', subtitle: '', timeCreated: Date.now()});
            return { ...prevState, ...{ notes: res, newNoteButtonClicked: true } }
        
        case 'CLICK_AWAY': 
            var notes = prevState.notes.slice();
            return { ...prevState, ...{ newNoteButtonClicked: false, notes: notes } }
        
        case 'ENTER_KEY_PRESSED': 
            return { ...prevState, ...{ enterKeyPressed: true } }
        
        case 'ON_SEARCH_INPUT_CHANGE': 
            return { ...prevState, ...{ searchBarInput: action.value } }
    
        case 'DELETE_NOTE': 
            var notes = prevState.notes.slice();
            notes = removeNote(notes, action.index)
            return { ...prevState, ...{ notes: notes } }
        
        default: {
            return prevState;
        }
    }

    function removeNote (notes, i) {
        return notes.filter((note, index) => {
            return index !== i
        })
    }

    function setTitleLength (title) {
        if (title.length > 30) return title.slice(0, 30) + ' ...';
        return title;
    }
}

export default notesReducer;