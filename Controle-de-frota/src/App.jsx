import { useState } from "react"

function App() {
  const [message, setMessage] = useState("ola mundo")

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("botão clicado")}>
        Mudar mensagem
      </button>
    </div>
  )
}

export default App
