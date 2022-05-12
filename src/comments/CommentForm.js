import {useState} from 'react'

function CommentForm({handleSubmit, submitLabel, initialText = ''}) {
  const [text, setText] = useState(initialText);
  const [isShowing, setIsShowing] = useState(true);
  const isTextareaDisabled = text.length === 0;
  const hasCancelButton = text.length > 0;

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(text);
    setText('');
  }

  const handleCancel = () => {
    setText('');
    setIsShowing(!isShowing);
  }

  return (
    <>
      {isShowing && <form onSubmit={onSubmit}>
        <textarea className='h-24 w-full border-2 border-solid-black' value={text} onChange={(e) => setText(e.target.value)} />
        <button className='bg-blue-500 text-white mb-4 rounded px-4' disabled={isTextareaDisabled}>{submitLabel}</button>
        {hasCancelButton && (
          <button type="button" className='bg-red-400 text-white mb-4 rounded px-4 ml-4' onClick={handleCancel}>Cancel</button>
        )}
      </form>}
    </>
  )
}

export default CommentForm;