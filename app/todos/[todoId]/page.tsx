import React from 'react'
import { Todo } from '../../../typings';

type PageProps = {
    params: {
        todoId: string;

    }
}

const fetchTodo = async (todoId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

    const todo: Todo = await res.json()
    return todo

}


async function TodoPage({ params: { todoId } }: PageProps) {

    const todo = await fetchTodo(todoId)

    return (
        <div className='p-10 bg-black text-white border-3 m-2 shadow-md rounded-lg'>
            <h1>
                {todo.title}
            </h1>
            <p>
                # {todo.id}
            </p>

            <p>
                Status: {todo.completed ? "Done" : "Outstanding"}
            </p>

            <p className='border-t border-white mt-5 text-right border-dashed'>
                User : {todo.userId}
            </p>
        </div>
    )
}

export default TodoPage