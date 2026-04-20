import { defineFrontendModule } from "@every-dash/module-sdk";

import { TodoListPage } from "./pages/TodoListPage";
import { TodoCreatePage } from "./pages/TodoCreatePage";
import { TodoDetailPage } from "./pages/TodoDetailPage";
import { OpenTodosWidget } from "./components/TodoWidget";

export const frontendModule = defineFrontendModule({
  moduleId: "todos",
  routes: [
    {
      pattern: "/modules/todos",
      title: "Todos",
      component: TodoListPage,
    },
    {
      pattern: "/modules/todos/new",
      title: "New Todo",
      component: TodoCreatePage,
    },
    {
      pattern: "/modules/todos/:todoId",
      title: "Todo Detail",
      component: TodoDetailPage,
    },
  ],
  widgetRenderers: {
    "todos.open": OpenTodosWidget,
  },
});
