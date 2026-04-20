from fastapi import APIRouter, Depends, FastAPI
from sqlmodel import Session

# In native every-dash, get_session is typically provided via core DB dependencies.
# We will assume app.core.db provides get_session for the platform.
from app.core.db import get_session

from modules.todos.backend.schemas import TodoCreate, TodoRead, TodoUpdate
from modules.todos.backend import service

router = APIRouter(prefix="/api/modules/todos", tags=["todos"])


@router.get("/", response_model=list[TodoRead])
def list_todos(session: Session = Depends(get_session)):
    return service.list_todos(session)


@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, session: Session = Depends(get_session)):
    return service.get_todo(session, todo_id)


@router.post("/", response_model=TodoRead)
def create_todo(todo_in: TodoCreate, session: Session = Depends(get_session)):
    return service.create_todo(session, todo_in)


@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, todo_in: TodoUpdate, session: Session = Depends(get_session)):
    return service.update_todo(session, todo_id, todo_in)


@router.delete("/{todo_id}")
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    return service.delete_todo(session, todo_id)


def register(app: FastAPI) -> None:
    app.include_router(router)
