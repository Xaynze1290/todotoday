from datetime import datetime
from sqlmodel import Session, select
from fastapi import HTTPException

from modules.todos.backend.models import Todo
from modules.todos.backend.schemas import TodoCreate, TodoUpdate, TodoWidgetRead


def list_todos(session: Session) -> list[Todo]:
    statement = select(Todo).order_by(Todo.created_at.desc())
    return session.exec(statement).all()


def get_todo(session: Session, todo_id: int) -> Todo:
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


def create_todo(session: Session, todo_in: TodoCreate) -> Todo:
    todo = Todo.model_validate(todo_in)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


def update_todo(session: Session, todo_id: int, todo_in: TodoUpdate) -> Todo:
    todo = get_todo(session, todo_id)
    todo_data = todo_in.model_dump(exclude_unset=True)
    for key, value in todo_data.items():
        setattr(todo, key, value)
    todo.updated_at = datetime.utcnow()
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


def delete_todo(session: Session, todo_id: int) -> dict:
    todo = get_todo(session, todo_id)
    session.delete(todo)
    session.commit()
    return {"ok": True}


def get_widget_data(session: Session) -> dict[str, list[dict]]:
    statement = select(Todo).where(Todo.is_complete == False).order_by(Todo.due_date.asc(), Todo.created_at.desc()).limit(10)
    open_todos = session.exec(statement).all()
    return {
        "todos.open": [
            TodoWidgetRead.model_validate(t).model_dump(mode="json")
            for t in open_todos
        ]
    }
