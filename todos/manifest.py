def manifest() -> dict:
    return {
        "id": "todos",
        "name": "Todos",
        "icon": "check-square",
        "route": "/modules/todos",
        "nav_group": "Productivity",
        "nav_order": 10,
        "kind": "module",
        "parent_id": None,
        "show_in_sidebar": True,
        "show_on_dashboard": True,
        "enabled": True,
        "has_widgets": True,
        "has_settings": False,
        "version": "0.1.0",
        "description": "Track your tasks and to-dos",
    }
