from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_complete: bool = False
    priority: int = 0
    due_date: Optional[datetime] = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_complete: Optional[bool] = None
    priority: Optional[int] = None
    due_date: Optional[datetime] = None


class TodoRead(TodoBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TodoWidgetRead(BaseModel):
    id: int
    title: str
    is_complete: bool
    due_date: Optional[datetime] = None
    updated_at: datetime

    class Config:
        from_attributes = True
