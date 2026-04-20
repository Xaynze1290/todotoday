from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session
from modules.todos.backend import service
from modules.todos.backend.schemas import TodoRead, TodoCreate, TodoUpdate

router = APIRouter(prefix="/api/modules/todos", tags=["todos"])

# Use a generic dependency resolution pattern for the drop-in module DB session.
# Modifies securely to the standard every-dash platform context.
def get_db_session(request: Request):
    if hasattr(request.state, "db"):
        yield request.state.db
    else:
        # Fallback if standard state injection isn't used
        raise RuntimeError("Database session not found on request state.")

def register(app):
    app.include_router(router)

@router.get("/", response_model=list[TodoRead])
def list_todos_route(session: Session = Depends(get_db_session)):
    return service.list_todos(session)

@router.post("/", response_model=TodoRead)
def create_todo_route(todo: TodoCreate, session: Session = Depends(get_db_session)):
    return service.create_todo(session, todo)

@router.get("/{todo_id}", response_model=TodoRead)
def get_todo_route(todo_id: int, session: Session = Depends(get_db_session)):
    todo = service.get_todo(session, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo_route(todo_id: int, todo: TodoUpdate, session: Session = Depends(get_db_session)):
    updated = service.update_todo(session, todo_id, todo)
    if not updated:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated

@router.delete("/{todo_id}")
def delete_todo_route(todo_id: int, session: Session = Depends(get_db_session)):
    success = service.delete_todo(session, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"success": True}