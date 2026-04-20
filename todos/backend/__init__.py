from modules.todos.backend.routes import register
from modules.todos.backend.service import get_widget_data

def get_widget_specs() -> list[dict]:
    return [
        {
            "id": "todos.open",
            "name": "Open Todos",
            "module_id": "todos",
            "size": "md",
        }
    ]

# Explicitly export the required backend contract functions
__all__ = ["register", "get_widget_specs", "get_widget_data"]