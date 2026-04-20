import { defineFrontendModule } from "@every-dash/module-sdk";
import TodosListPage from "./pages/TodosListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import TodoCreatePage from "./pages/TodoCreatePage";
import TodoEditPage from "./pages/TodoEditPage";
import TodosWidget from "./components/TodosWidget";

export const frontendModule = defineFrontendModule({
  moduleId: "todos",
  routes: [
    {
      pattern: "/modules/todos",
      title: "Todos",
      component: TodosListPage,
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
    {
      pattern: "/modules/todos/:todoId/edit",
      title: "Edit Todo",
      component: TodoEditPage,
    },
  ],
  widgetRenderers: {
    "todos.open": TodosWidget,
  },
});