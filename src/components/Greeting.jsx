import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(randomMessage());

  return (
    <div>
      <h3 onClick={() => setGreeting(randomMessage())}><abbr title="Pulse para cambiar el saludo">👋 ¡Oh, {greeting}! Bienvenidos a otro blog más sobre ciberseguridad, homelabs, Linux y Emacs.</abbr></h3>
    </div>
  );
}