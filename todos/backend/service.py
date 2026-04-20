from sqlmodel import Session, select
from datetime import datetime
from modules.todos.backend.models import Todo
from modules.todos.backend.schemas import TodoCreate, TodoUpdate

def list_todos(session: Session) -> list[Todo]:
    statement = select(Todo).order_by(Todo.is_complete, Todo.priority.desc(), Todo.created_at.desc())
    return session.exec(statement).all()

def get_todo(session: Session, todo_id: int) -> Todo | None:
    return session.get(Todo, todo_id)

def create_todo(session: Session, data: TodoCreate) -> Todo:
    todo = Todo.model_validate(data)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def update_todo(session: Session, todo_id: int, data: TodoUpdate) -> Todo | None:
    todo = session.get(Todo, todo_id)
    if not todo:
        return None

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(todo, key, value)

    todo.updated_at = datetime.utcnow()
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

def delete_todo(session: Session, todo_id: int) -> bool:
    todo = session.get(Todo, todo_id)
    if not todo:
        return False
    session.delete(todo)
    session.commit()
    return True

def get_widget_data(session: Session) -> dict[str, list[dict]]:
    statement = select(Todo).where(Todo.is_complete == False).order_by(Todo.priority.desc(), Todo.due_date.asc()).limit(5)
    todos = session.exec(statement).all()

    return {
        "todos.open": [
            {
                "id": t.id,
                "title": t.title,
                "is_complete": t.is_complete,
                "priority": t.priority,
                "due_date": t.due_date.isoformat() if t.due_date else None,
            }
            for t in todos
        ]
    }