import React from 'react';
import TodoList from './features/todos/TodoList';
import TodoInput from './features/todos/TodoInput';
import Filters from './features/filter/Filters';

function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header className="py-2 bg-light">
        <h1 className="text-center">Todo App</h1>
      </header>
      <main className="flex-grow-1 overflow-auto ">
        <section className="container-fluid">
          <div className="row ">
            <div className="col-12 col-md-6 mx-auto mb-3 p-2">
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-light d-flex justify-content-center">
        <Filters />
      </footer>
    </div>
  );
}

export default App;
