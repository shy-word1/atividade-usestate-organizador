import { useState } from 'react'

function App() {
  const [texto, setTexto] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [filtro, setFiltro] = useState('todas')

  function adicionarTarefa(evento) {
    evento.preventDefault()

    const textoLimpo = texto.trim()
    if (!textoLimpo) return

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    }

    setTarefas((anteriores) => [...anteriores, novaTarefa])
    setTexto('')
  }

  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    )
  }

  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id),
    )
  }

  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida),
    )
  }

  const total = tarefas.length
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length
  const pendentes = total - concluidas

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') return !tarefa.concluida
    if (filtro === 'concluidas') return tarefa.concluida
    return true
  })

  return (
    <main className="pagina">
      <header className="topo">
        <span className="marca">MINHA ROTINA</span>
        <span className="data">Organize seu dia</span>
      </header>

      <section className="painel">
        <div className="intro">
          <p className="etiqueta">LISTA DE TAREFAS</p>
          <h1>Um passo de cada vez.</h1>
          <p className="subtitulo">
            Coloque as ideias no papel e vá marcando conforme terminar.
          </p>
        </div>

        <form className="formulario" onSubmit={adicionarTarefa}>
          <label htmlFor="nova-tarefa">O que você precisa fazer?</label>
          <div className="campo-linha">
            <input
              id="nova-tarefa"
              type="text"
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Ex.: terminar a atividade de React"
            />
            <button className="botao-adicionar" type="submit">
              Adicionar <span aria-hidden="true">+</span>
            </button>
          </div>
        </form>

        <section className="resumo" aria-label="Resumo das tarefas">
          <div className="numero">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <div className="numero">
            <span>Concluídas</span>
            <strong>{concluidas}</strong>
          </div>
          <div className="numero">
            <span>Pendentes</span>
            <strong>{pendentes}</strong>
          </div>
        </section>

        <section className="lista-secao">
          <div className="lista-topo">
            <h2>Suas tarefas</h2>
            <div className="filtros" aria-label="Filtrar tarefas">
              <button
                type="button"
                className={filtro === 'todas' ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro('todas')}
              >
                Todas
              </button>
              <button
                type="button"
                className={filtro === 'pendentes' ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro('pendentes')}
              >
                Pendentes
              </button>
              <button
                type="button"
                className={filtro === 'concluidas' ? 'filtro ativo' : 'filtro'}
                onClick={() => setFiltro('concluidas')}
              >
                Concluídas
              </button>
            </div>
          </div>

          {tarefasVisiveis.length === 0 ? (
            <div className="vazio">
              <span className="vazio-icone" aria-hidden="true">✓</span>
              <p>
                {tarefas.length === 0
                  ? 'Ainda não tem nenhuma tarefa por aqui.'
                  : 'Não tem tarefa nesse filtro.'}
              </p>
              <span>Adicione uma tarefa para começar.</span>
            </div>
          ) : (
            <ul className="tarefas">
              {tarefasVisiveis.map((tarefa) => (
                <li
                  className={tarefa.concluida ? 'tarefa concluida' : 'tarefa'}
                  key={tarefa.id}
                >
                  <label className="tarefa-label">
                    <input
                      type="checkbox"
                      checked={tarefa.concluida}
                      onChange={() => alternarConclusao(tarefa.id)}
                    />
                    <span className="check-visual" aria-hidden="true" />
                    <span className="tarefa-texto">{tarefa.texto}</span>
                  </label>
                  <button
                    className="remover"
                    type="button"
                    onClick={() => removerTarefa(tarefa.id)}
                    aria-label={`Remover tarefa: ${tarefa.texto}`}
                    title="Remover tarefa"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {concluidas > 0 && (
            <button className="limpar" type="button" onClick={limparConcluidas}>
              Limpar tarefas concluídas
            </button>
          )}
        </section>
      </section>

      <footer>
        <span>Feito no meu ritmo.</span>
        <span>{concluidas} de {total} concluídas</span>
      </footer>
    </main>
  )
}

export default App