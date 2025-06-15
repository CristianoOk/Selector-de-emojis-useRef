import { forwardRef, useState, useRef, useEffect } from "react";
import {data as emojiList} from './data';
import EmojiSearch from "./emojiSearch";
import EmojiButton from "./emojiButton";
import styles from './emojiPicker.module.scss';

export function EmojiPicker(props, inputRef) {

  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);

  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if(!containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setEmojis(emojiList);
      }
    });
  }, []);

  function handleClickOpen() {
    setIsOpen(!isOpen); //Lo que esta adentro de paréntesis es la negación de "isOpen", o sea, si "isOpen" está en estado "true" lo cambia a "false", y si está en "false" => lo niega, en consecuancia queda en estado "true".
  }

  function handleSearch(e) {
    const q = e.target.value;

    if(!!q){ //"!!q" evaluates to true if "q" is not null or an empty string.
      const search = emojiList.filter((emoji) => {
        return (emoji.name.toLowerCase().includes(q) || emoji.keywords.toLowerCase().includes(q));
      });
      setEmojis(search);
    } else {
      setEmojis(emojiList);
    }
  }

  /*
  function EmojiPickerContainer() {
    return( 
      <div>
        <EmojiSearch onSearch={handleSearch} />
        <div>
          {emojis.map(emoji => (<div key={emoji.symbol}>{emoji.symbol}</div>))}
        </div>
      </div>
      );
  }
  */

  function handleOnClickEmoji(emoji) {
    const cursorPos = inputRef.current.selectionStart;
    const text = inputRef.current.value;
    const prev = text.slice(0, cursorPos);
    const next = text.slice(cursorPos);

    inputRef.current.value = prev + emoji.symbol + next;
    inputRef.current.selectionStart = cursorPos + emoji.symbol.length;
    inputRef.current.selectionEnd = cursorPos +emoji.symbol.length;
    inputRef.current.focus();
  }
  return (
  <div ref={containerRef} className={styles.inputContainer}>
    <button onClick={handleClickOpen} className={styles.EmojiPickerButton}>😁</button>

    {isOpen ? ( 
    <div className={styles.emojiPickerContainer}>
      <EmojiSearch onSearch={handleSearch} />
      <div className={styles.emojiList}>
        {emojis.map(emoji => (<EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji}/>))}
      </div>
    </div>
    ) : ("") /*Si "isOpen" es 'true' => se llama a la función "EmojiPickerContainer", else se muestra un string avoid ("").*/} 
  </div>
  );
}

export default forwardRef(EmojiPicker); //"forwardRef()", esta función es específica de 'react' (por eso fue importada), a lo que voy, yo no la cree solo la estoy usando gracias a que la importé previamente. Esta función pide/solicita una función callback, en este caso uso una función (pudo haber sido incluso una función flecha if I had wanted jaj).