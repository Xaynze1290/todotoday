from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    is_complete: bool = False
    priority: int = 1
    due_date: Optional[datetime] = None

class Todo(TodoBase, table=True):
    __tablename__ = "module_todos_todo"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)