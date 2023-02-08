import React from 'react'
import { Todo } from '../../../typings';



type PageProps = {
    params: {
        todoId: string;

    }
}


// adding static site rendering and isr 

/* cache: "force-cache" forces browzer to create a cache
forces static site rendering. Static add force cache

adding next revalidate activates isr incremental static rendering along with a time value in seconds causes the brozer to revalidate annd rebuild the chahce after the allottetd time
*/
const fetchTodo = async (todoId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, { next: { revalidate: 60 } });

    const todo: Todo = await res.json()
    return todo

}

//Origionall the todo page is server side rendered pros are the page is visible faster as it is pre rendering by the browser. con is the page takes longer to respond to user input. 


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

export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const todos: Todo[] = await res.json();

    const splicedTodos = todos.splice(1, 10)/* Pre renders first 10pages */

    return splicedTodos.map(todo => ({ todoId: todo.id.toString(), }))
}