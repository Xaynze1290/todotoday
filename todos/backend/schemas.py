from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    is_complete: bool = False
    priority: int = 1
    due_date: Optional[datetime] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_complete: Optional[bool] = None
    priority: Optional[int] = None
    due_date: Optional[datetime] = None

class TodoRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    is_complete: bool
    priority: int
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime